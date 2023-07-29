.PHONY: serve all dev reload watch clean

all: public/app.js public/main.css public/theme/theme.css public/index.html

public/app.js: $(wildcard client/*.js) $(wildcard client/**/*.js) $(wildcard client/**/*.jsx) ./node_modules/mithril/mithril.js node_modules/mergerino/dist/mergerino.js
	npx esbuild --jsx-factory=m --sourcemap --bundle client/app.js --outfile=public/app.js

node_modules/mithril/mithril.js:
	npm install --prefix . mithril

node_modules/mergerino/dist/mergerino.js:
	npm install --prefix . mergerino

public/theme/theme.css: $(wildcard client/images/*) client/theme.css
	npx esbuild --bundle client/theme.css --outfile=public/theme/theme.css --loader:.jpg=file --loader:.png=file --loader:.gif=file --loader:.svg=file

public/main.css: $(wildcard client/*.html) $(wildcard client/**/*.jsx)
	npx tailwindcss -i client/main.css -o $@ --content "client/**/*.{html,jsx}"

public/index.html: client/index.html
	cp $? $@

serve:
	python -m http.server --directory public

reload:
	websocketd --loglevel=fatal --port=8083 watchexec --no-vcs-ignore -w public 'echo "$$WATCHEXEC_WRITTEN_PATH"'

watchtw:
	npx tailwindcss -w -i client/main.css -o public/main.css --content "client/**/*.{html,jsx}"

watch:
	watchexec -w client "make --no-print-directory"

clean:
	rm -rf node_modules
	rm package*.json
	rm -rf public
