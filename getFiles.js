/**
 *  处理命令行参数,返回一个数组，包含所有图片的路径
 */

const fs = require('fs')
const R = require('ramda')
const path = require('path')
const traverse = require('./traverse.js')

const f = filePath => {
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) return ([...traverse(filePath)])
    if (stats.isFile()) return ([path.normalize(filePath)])
}

module.exports = R.chain(f)