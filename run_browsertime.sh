#!/bin/sh
PATH=$PATH:/usr/local/bin

NPM=/usr/local/bin/npm
cat ./input.tsv | while read LINE; do
    NAME=`echo "$LINE" | cut -f1`
    URL=`echo "$LINE" | cut -f2` 
    $NPM run browsertime "$URL" \
    -- --userAgent browsertime/HeadlessChrome --headless true --output `date '+%Y%m%d%H%M%S'`_result \
    --skipHar true --prettyPrint true \
    --resultDir browsertime-results/"$NAME" \
    --silent true >> ./logs/browsertime_log
done
