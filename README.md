# shadow council

The collective's site. Static Jekyll with a glitch-terminal theme inherited from
the tech blog at [`/logs`](../logs) and rebranded.

**There is no leader, and there is no `maintainer` in the README either.** Every
edit here is a collective act and the commit history should show it: four
handles, no lead author.

Live at <https://imlokisenpai.github.io/shadow-council/>

---

## Editing this

Two files do almost all the work.

**`_data/roster.yml`** — the whole organisation. Who writes here, what they
write, and the five rules. There is deliberately no `role: leader` key. Full
names are off by default; `public_name` is a per-person opt-in and nobody has
opted in. Read the comments at the top before you touch it.

**`_config.yml`** — identity, tagline, description, and the feed's author. The
author is `type: Organization` on purpose, so the schema.org metadata and the
RSS feed describe a collective rather than a person.

Everything else is a post.

## Writing a post

Drop a file in `_posts/` named `YYYY-MM-DD-slug.md`:

```yaml
---
title: "The title as it should read in the listing"
subtitle: "One line under it"
slug: my-post                      # optional; makes a nicer URL
date: 2026-09-29 12:00:00 +05:30
description: "One sentence, used in listings, the feed and og:meta"
tags: [law, method]
categories: [analysis]             # one section per post
---
```

- `categories` are the coarse buckets shown under **sections** on the site.
  Keep it to one.
- `tags` are the fine threads under **threads**. Cross-reference liberally;
  they are the site's index.
- Add `draft: true` for the banner. Note this is cosmetic only — the post
  still publishes and still appears in the feed. There is no real draft
  support. If a post must not go up, do not commit it to `main`.

## The rules that are not negotiable

These are on the [names page](https://imlokisenpai.github.io/shadow-council/members/)
and they are the reason the site exists. In short:

1. **No spokesperson.** Nothing here is attributable to anyone but its author.
2. **No line.** No position outlives the agreement of whoever is making it.
3. **Receipts.** A claim without a document attached does not go up. Name the
   body that made the finding and the date it made it. Distinguish *a court
   found* from *a commission alleged* from *we are inferring*. Where a fact is
   genuinely contested, say so in the sentence — not in a hedge at the end.
4. **Corrections in place.** A fix goes up where the error went up, visibly, and
   stays there. Do not quietly edit a published claim and let the git history be
   the only record.
5. **No performance.** Write to be checked, not to be quoted.

## Local build

```bash
make build     # production build into _site/
make serve     # http://127.0.0.1:4000/shadow-council/
```

Ruby 3.3. `bundle install` first if the gems are missing.

## Deploying

Push to `main`. GitHub Actions builds and deploys to Pages; you do not need to
run anything locally first.

```bash
git add -A
git commit -m "what changed and why"
git push origin main
```

Two things must match the repository name or the site renders unstyled:

| Field     | Value                                |
| --------- | ------------------------------------ |
| `url`     | `https://imlokisenpai.github.io`     |
| `baseurl` | `/shadow-council` — the repo name    |

The deploy is driven by `.github/workflows/deploy.yml`. It runs
`jekyll build` directly, which matters: `_plugins/` only executes when Jekyll is
invoked yourself. If this repo is ever switched to GitHub's "Deploy from branch"
builder, **the thread and section pages will 404**, because
`_plugins/taxonomy.rb` is what generates them.

## Layout

```
_config.yml          identity, build settings, taxonomy bases
_data/roster.yml     the collective: rules and who writes here
_posts/              documents
_data -> _layouts    page templates
_layouts/post.html   post template (byline, tags, sections, pager)
_layouts/taxonomy.html  one thread or section page
_layouts/page.html   plain page template (about, names)
_includes/chrome.html   masthead, nav, footer — edit the nav here
_includes/head.html     meta, favicon, anti-flash theme script
assets/css/main.css the entire design
assets/js/main.js   rain, typewriter, theme toggle, counters, copy buttons
_plugins/taxonomy.rb  generates /threads/<x>/ and /sections/<y>/
```

## Colophon

No theme gem, no JavaScript libraries, no web fonts, no analytics, no cookies,
no third-party requests. The background is a `<canvas>` drawing falling glyphs
in the reader's browser which then forgets about it; the glitch is `clip-path`
and two pseudo-elements. Colour schemes are phosphor-dark and amber-on-paper,
both meeting 4.5:1 for body text in either direction. Honours
`prefers-reduced-motion`.
