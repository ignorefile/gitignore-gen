#!/usr/bin/env node
'use strict';
var fs = require('fs');

var map = require('through2-map');

var cmd = require('./lib/cmd');
var tpls = require('./lib/tpl.json');
var keywords = process.argv.slice(2);

var options = cmd();

var cwd = process.cwd();

var result = options.append.reduce(function(prev, curr, idx, arr) {
    if(keywords.indexOf(curr) >= 0)
    return prev.concat(tpls[curr]);
}, []);

var ws = fs.createWriteStream('./.gitignore', {
    flags: options.force ? 'w' : 'a'
});

if(options.custom) {
    var rules = options.custom.reduce(function(memo, curr) {
        return memo + curr + '\n';
    }, '\n');

    ws.write('#=<<< custom =#' + rules + '#= custom >>>=#\n\n');
}

if(keywords.indexOf('rm') < 0) {
	ws.end(result.join(''));
}

var stream = fs.ReadStream(cwd + '/.gitignore');
var wsNew = fs.createWriteStream(cwd + '/.gitignore_new');

var remove = map({wantStrings: true}, function(str) {
	if(options.remove.length <= 0) return str;
	options.remove.forEach(function(arg) {
		if(tpls[arg]) {
			str = str.replace(tpls[arg], '');
		}
	});
	return str;
});

stream.pipe(remove).pipe(wsNew).on('finish', function() {
    console.info('.gitignore file has been generated.');
});

wsNew.on('error', function(err) {
	return console.error('Error occured, pls try again.');
});

fs.unlink(cwd + '/.gitignore', function(err) {
	if(err) throw err;
	fs.rename(cwd + '/.gitignore_new', cwd + '/.gitignore', function(err) {
		if(err) throw err;
	});
});