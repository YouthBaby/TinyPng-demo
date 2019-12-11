const fs = require('fs')
const R = require('ramda')
const path = require('path')
const analyze = require('./analyze.js')
const getFiles = require('./getFiles.js')
const tinify = require('tinify')
tinify.key = 'LsLkJ1Q1xDXHgkZuZGoQJRXsq6E9lc7K'

/* Validation of API key */
tinify.validate(function (err) {
    if (err) throw new Error(' your API key is invalid , please input the correct API key ')
})

const param = process.argv.slice(2)
const files = getFiles(param)

const transfer = {
    name: R.flip(R.concat)('-new')
}
const rename = R.compose(path.format, R.evolve(transfer), R.omit(['root', 'base']), path.parse)
const getProp = prop => R.compose(R.prop(prop), fs.statSync)
const getSize = getProp('size')

const results = files.map(value => new Promise((resolve, reject) => {
    const newName = rename(value)
    tinify.fromFile(value).toFile(newName, function () {
        const data = analyze(getSize(value), getSize(newName))
        process.stdout.write('**************************************************' + '\n')
        process.stdout.write(`路  径:${value}\n压缩前:${data.before}\n压缩后:${data.after}\n压缩率:${data.precent}\n`)
        resolve()
    })
}))

Promise.all(results)
    .then(() => {
        process.stdout.write('**************************************************' + '\n');
        process.stdout.write('all images have been compressed completely!')
    })
    .catch(err => {
        process.stdout.write('error message :' + JSON.stringify(err))
    })