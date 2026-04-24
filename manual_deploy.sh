
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"
git push -f https://github.com/georgiougt/Diamantides.git master:gh-pages
cd ..
