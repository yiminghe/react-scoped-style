#!/usr/bin/env bash

npm run build
cd webpack-examples
webpack -d
cd ../
cp -r webpack-examples build/
gh-pages -d build