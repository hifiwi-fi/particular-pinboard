#!/usr/bin/env bash
## OsX only script. Requires installing a brew command: chrome-cli
set -ev

# Not sure why build.sh is failing locally
./node_modules/uglify-js/bin/uglifyjs < pinboard-particular.js > build/bookmark.js
chrome-cli execute "$(cat build/bookmark.js)"
