#! /usr/bin/env node

var fs = require('fs');

var map = require('through2-map');

var cmd = require('./lib/cmd');
var tpls = require('./lib/tpl.json');
var keywords = process.argv.slice(2);

var options = cmd();

var cwd = process.cwd();

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

if(keywords.indexOf('rm') < 0) {
	ws.end(result.join(''));
}


// if(options.remove.length > 0) {
// 	var remove = map({wantStrings: true}, function(str) {
// 		options.remove.forEach(function(arg) {
// 			if(tpls[arg]) {
// 				str = str.replace(tpls[arg], '');
// 			}
// 		})
// 		return str;
// 	})

// 	var stream = fs.ReadStream(cwd + '/.gitignore');
// 	var ws = fs.createWriteStream(cwd + '/.gitignore_new');
// 	stream.pipe(remove).pipe(ws);

// 	ws.on('error', function(err) {
// 		return console.error('Error occured, pls try again.')
// 	})

// 	fs.unlink(cwd + '/.gitignore', function(err) {
// 		if(err) throw err;
// 		fs.rename(cwd + '/.gitignore_new', cwd + '/.gitignore', function(err) {
// 			if(err) throw err;
// 			console.info('Change success! Have fun!')
// 		});
// 	})

	
// }

var stream = fs.ReadStream(cwd + '/.gitignore');
var wsNew = fs.createWriteStream(cwd + '/.gitignore_new');

var remove = map({wantStrings: true}, function(str) {
	if(options.remove.length <= 0) return str;
	options.remove.forEach(function(arg) {
		if(tpls[arg]) {
			str = str.replace(tpls[arg], '');
		}
	})
	return str;
});

stream.pipe(remove).pipe(wsNew);

wsNew.on('error', function(err) {
	return console.error('Error occured, pls try again.')
})

fs.unlink(cwd + '/.gitignore', function(err) {
	if(err) throw err;
	fs.rename(cwd + '/.gitignore_new', cwd + '/.gitignore', function(err) {
		if(err) throw err;
		console.info('Change success! Have fun!')
	});
})