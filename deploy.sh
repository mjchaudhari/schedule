set -e

# build
npm run build

# go into the build output dir
cd dist

# if custom domain
# echo 'www.mydomain.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:mjchaudhari/schedule.git master:gh-pages
cd -