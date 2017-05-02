// fis.match('/src/(*).html', {
//   release: '$1'
// })
fis.match('/src/(*).{html,ejs}', {
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

// 资源定位使用在 非HTML文件 
// https://github.com/fex-team/fis3/issues/217
fis.match('*.ejs', {
  isHtmlLike: true
});
