let fs = require('fs');
let traverse = require('./traverse.js');
let tinify = require('tinify');
tinify.key = 'LsLkJ1Q1xDXHgkZuZGoQJRXsq6E9lc7K';

// let files = traverse(process.argv.slice(2));
let files = traverse('image');
let format = path => {
    let dotIndex = path.lastIndexOf('.');
    let result = path.substring(0, dotIndex) + '-new' + path.substring(dotIndex);
    return result
}
let results = files.map(value => {
    return new Promise((resolve, reject) => {
        let source = tinify.fromFile(value);
        let formatFile = format(value);
        source.toFile(formatFile, function () {
            let prev = fs.statSync(value);
            let after = fs.statSync(formatFile);
            process.stdout.write(`${value}---压缩前:${(prev.size / 1024).toFixed(1)}KB---压缩后:${(after.size / 1024).toFixed(1)}KB---压缩率:${(100 * (1 - after.size / prev.size)).toFixed(1)}%\n`);
            resolve()
        });
    })
})
Promise.all(results)
    .then(() => {
        process.stdout.write('all images have been compressed completely!')
    })
    .catch(err => {
        process.stdout.write('error message :' + JSON.stringify(err))
    })