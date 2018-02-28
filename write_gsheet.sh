#!/bin/sh
PATH=$PATH:/usr/local/bin
NPM=/usr/local/bin/npm
cat ./sheet.txt | while read LINE; do
    DIR=`echo "$LINE" | cut -f1`
    SHEET_NAME=`echo "$LINE" | cut -f2`
    SHEET_ID=`echo "$LINE" | cut -f3`
    
    node index.js --jsonfiledir "$DIR" \
    --clientsecretpath ./spreadsheet_api_key.json \
    --sheetname $SHEET_NAME \
    --spreadsheetid $SHEET_ID >> ./logs/write_gsheet_log
done
