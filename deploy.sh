npm run build
cd dist
git init
git add -A
git commit -m ":rocket: Deploy"
git push -f git@github.com:pierrechls/tweetscape.git master:gh-pages
