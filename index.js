#! /usr/bin/env node

var fs = require('fs');

var tpls = require('./lib/tpl.json');
var keywords = process.argv.slice(2);

var result = keywords.reduce(function(prev, curr, idx, arr) {
    if(keywords.indexOf(curr) >= 0) 
    return prev.concat(tpls[curr])
}, [])

var ws = fs.createWriteStream('./.gitignore', {
    flags: 'a'
})

ws.end(result.join(''));
