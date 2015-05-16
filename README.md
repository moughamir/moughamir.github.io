```
bundle install
github-page
jekyll serve
```

## Test Script
https://github.com/gjtorikian/html-proofer

```
#!/usr/bin/env bash
set -e # halt script on error

bundle exec jekyll build
bundle exec htmlproof ./_site
```