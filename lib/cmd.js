var program = require('commander');

var pkginfo = require('../package.json');

function custom(val, memo) {
    return val.split(',');
}

module.exports = function() {
    var results = {};
    program
    .version(pkginfo.version)
    .command('view', 'view .gitignore file')
    .option('-c, --custom [value]', 'Custom ignore file pattern, split by comma', custom, [])
    .option('-f, --force', 'Force re write .gitignore file')
    .parse(process.argv);

    results.custom = program.custom;
    results.force = program.force;
    results.append = program.args;

    return results;

}



