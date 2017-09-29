#! /usr/bin/env bash
# author : william

echo "start"
npm install
echo "install success"
node reset.js
echo "init success"
rm -f reset.js
echo "delete"
npm run dev
echo "run success"