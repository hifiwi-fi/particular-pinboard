#!/usr/bin/env bash
## OsX only script. To be used once after ./test.sh
set -e

echo -n "javascript:" | cat - build/bookmark.js > /tmp/out && mv /tmp/out build/bookmark.js
cat build/bookmark.js | pbcopy
