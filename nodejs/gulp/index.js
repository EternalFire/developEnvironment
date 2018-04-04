var fs = require("fs");
var sourceMap = require('source-map');

var data = fs.readFileSync('_game.js.map', {encoding: "utf8"});
var rawSourceMap = JSON.parse(data);

var main = async () => {
    const whatever = await sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {

        console.log(consumer.originalPositionFor({ line: 80315, column: 11 }));
        console.log(consumer.originalPositionFor({ line: 154981, column: 5 }));


    });
}
main();