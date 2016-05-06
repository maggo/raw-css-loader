/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var path = require('path');

module.exports = function(content, map) {
	this.cacheable && this.cacheable();
	this.value = content;

	if(map) {
    if (typeof map === 'string') {
      map = JSON.parse(map);
    }

    if(map.sources) {
      map.sources = map.sources.map(function(source) {
        source = source.split("!").pop();
        var p = path.relative(this.options.context, source).replace(/\\/g, "/");
        if(p.indexOf("../") !== 0)
          p = "./" + p;
        return "/" + p;
      }, this);
      //map.sourceRoot = "webpack://";
    }
  }

	return "module.exports = [[module.id, " + JSON.stringify(content) + ", \"\", " + JSON.stringify(map) + "]];";
}
