const fs = require("fs");
const pngToJpeg = require('png-to-jpeg');

var PSD = require('psd');
var psd = PSD.fromFile("file.psd");
psd.parse();

console.log(psd.tree().export());

console.log(psd.tree().childrenAtPath("path/name")[0].get("image"));
psd.tree().childrenAtPath("path/name")[0].get("image").saveAsPng('bg.png')
    .then(function(){
        console.log("exported!!!!");

        let buffer = fs.readFileSync("./bg.png");
        pngToJpeg({quality: 98})(buffer)
        .then(output => fs.writeFileSync("./bg98.png", output));
    });

