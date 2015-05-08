mkdir build
cp -r webpack-examples build/
cp -r build ../react-scoped-style-gh-pages/
cd ../react-scoped-style-gh-pages
git add --all
git commit -am "update"
git push origin gh-pages:gh-pages