.PHONY: serve build clean push preview

serve:
	bundle exec jekyll serve --livereload --host 0.0.0.0

build:
	JEKYLL_ENV=production bundle exec jekyll build --trace

clean:
	bundle exec jekyll clean
	rm -rf .jekyll-cache

preview:
	JEKYLL_ENV=production bundle exec jekyll build --trace
	@echo "built _site/ — open _site/index.html or run: make serve"
