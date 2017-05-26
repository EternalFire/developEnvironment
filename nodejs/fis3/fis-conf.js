var jsdom = require('jsdom');
const { JSDOM } = jsdom;

fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
  // postpackager: fis.plugin('loader')
});

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

fis.match('/*.png', {
  release: false
})

// 资源定位使用在 非HTML文件 
// https://github.com/fex-team/fis3/issues/217
fis.match('*.ejs', {
  isHtmlLike: true
});

// fis.match('*.css', {
//   packTo: '/main.css'
// });

fis.match('*.html', {
  preprocessor: function(content, file, settings) {
    console.log('file >', file)
    const dom = new JSDOM(content);
    
    let nodeList = dom.window.document.getElementsByTagName('link');
    
    for (var i = nodeList.length - 1; i >= 0; i--) {
      if (nodeList[i].rel == 'stylesheet') {
        nodeList[i].href = './' + nodeList[i].href;
      }      
    }

    return dom.serialize();
    // return content + '\n\n/** aiueo **/\n\n';
  }
});
