fis.match('/src/(*).html', {
  release: '$1'
})

fis.match('package.json', {
  release: false
})

fis.match('/src/index.js', {
  release: false
})

fis.match('{/*.png,/*.css}', {
  release: false
})