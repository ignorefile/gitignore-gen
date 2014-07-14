#! /usr/bin/env node

var fs = require('fs');

var cwd = process.cwd();

fs.createReadStream(cwd + '/.gitignore').pipe(process.stdout);
