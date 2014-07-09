#! /usr/bin/env node

var fs = require('fs');

var cmd = require('./lib/cmd-parse');
var tpls = require('./lib/tpl.json');
var keywords = process.argv.slice(2);

var options = cmd();

var result = options.append.reduce(function(prev, curr, idx, arr) {
    if(keywords.indexOf(curr) >= 0) 
    return prev.concat(tpls[curr])
}, [])

var ws = fs.createWriteStream('./.gitignore', {
    flags: options.force ? 'w' : 'a'
})

if(options.custom) {
    options.custom.forEach(function(itm) {
        ws.write(itm + '\n');
    })
}

ws.end(result.join(''));
