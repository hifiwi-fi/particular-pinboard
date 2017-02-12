#!/bin/sh

SRC=pinboard-particular.js
OUT=build
MINIFY=$(which uglifyjs)
BACKUP_UGLIFY="./node_modules/uglify-js/bin/uglifyjs"
if [ -z "$MINIFY" ]; then
    if [ -x "$BACKUP_UGLIFY" ]; then
        MINIFY="$BACKUP_UGLIFY"
    else
        printf "No uglifyjs found. Bailing out\n"
        exit 1
    fi
fi
MINIFY="${MINIFY} -mt"

if [ ! -d $OUT ]; then
    mkdir $OUT
fi

printf "javascript:%s" "$($MINIFY 2>/dev/null < $SRC)" > $OUT/bookmark.js
printf "javascript:%s" > $OUT/readlater.js
sed 's/readlater = false/readlater = true/' $SRC | 
    $MINIFY 2>/dev/null >> $OUT/readlater.js

printf "javascript:%s" > $OUT/video_to_watch.js
sed 's/video_to_watch = false/video_to_watch = true/' $SRC | 
    $MINIFY 2>/dev/null >> $OUT/video_to_watch.js

printf "javascript:%s" > $OUT/pinswift.js
sed 's/appUrl = null/appUrl = "pinswift:\/\/x-callback-url\/add?"/' $SRC |
    $MINIFY 2>/dev/null >> $OUT/pinswift.js

printf "javascript:%s" > $OUT/spillo.js
sed 's/appUrl = null/appUrl = "spillo:\/\/\/bookmark?"/' $SRC |
    $MINIFY 2>/dev/null >> $OUT/spillo.js