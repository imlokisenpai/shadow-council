# frozen_string_literal: true

# Generates one page per tag and one per category.
#
# Jekyll exposes `site.tags` / `site.categories` to Liquid, but it has no way to
# turn a hash into a page — that needs a generator. This one is ~50 lines and
# keeps the dependency list short.
#
# NOTE: `_plugins/` only runs when Jekyll is invoked directly (locally, or on CI).
# That is exactly what .github/workflows/deploy.yml does, so this is fine. If you
# ever switch the repo to "Deploy from branch" with GitHub's own build, the tag
# and category pages will 404 — switch back to Actions.

module ShadowCouncil
  class Taxonomy < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      return unless site.config.dig("taxonomy", "enabled") != false

      settings = site.config["taxonomy"] || {}
      tag_base        = settings.fetch("tag_base", "/threads")
      category_base   = settings.fetch("category_base", "/sections")
      plural_tag_base = settings.fetch("plural_tag_base", tag_base)
      plural_cat_base = settings.fetch("plural_category_base", category_base)

      buckets = [
        { kind: "tag",      singular: "thread",  plural: "threads",  base: tag_base,      plural_base: plural_tag_base, map: site.tags },
        { kind: "category", singular: "section", plural: "sections", base: category_base, plural_base: plural_cat_base, map: site.categories }
      ]

      buckets.each do |bucket|
        next if bucket[:map].nil?

        bucket[:map].each do |name, posts|
          next if posts.nil? || posts.empty?

          name = name.to_s
          slug = Jekyll::Utils.slugify(name)
          next if slug.empty?

          page = Jekyll::PageWithoutAFile.new(site, site.source, File.join(bucket[:base], slug), "index.html")
          page.data.merge!(
            "layout"      => "taxonomy",
            "title"       => name,
            "slug"        => slug,
            "kind"        => bucket[:kind],
            "kind_label"  => bucket[:singular],
            "plural_label"=> bucket[:plural],
            "base"        => bucket[:plural_base],
            "posts"       => posts.sort_by { |p| -p.date.to_i },
            "permalink"   => File.join(bucket[:base], slug, "/").squeeze("/")
          )

          site.pages << page
        end
      end

      Jekyll.logger.info "shadow council:", "taxonomy pages built from #{site.tags.size} threads / #{site.categories.size} sections"
    end
  end
end
