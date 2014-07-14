var program = require('commander');

var pkginfo = require('../package.json');

function list(val) {
    return val.split(',');
}

module.exports = function() {
    var results = {};
    program
    .version(pkginfo.version)
    .command('view', 'view .gitignore file')
    .option('-r, --remove [value]', 'remove some pattern', list, [])
    .option('-c, --custom [value]', 'Custom ignore file pattern, split by comma', list, [])
    .option('-f, --force', 'Force re write .gitignore file')
    .parse(process.argv);

    results.custom = program.custom;
    results.force = program.force;
    results.append = program.args;
    results.remove = program.remove;

    return results;

}



