/**
 * 遍历文件夹，获取文件夹下所有的图片
 * refer to : https://segmentfault.com/q/1010000008827322  | thanks : jsdt
 */
const fs = require('fs')
const path = require('path')

module.exports = ((result) => (startPath) => {
    (function finder(param) {
        const files = fs.readdirSync(param)
        files.map(val => {
            let fPath = path.join(param, val)
            let stats = fs.statSync(fPath)
            if (stats.isDirectory()) finder(fPath)
            if (stats.isFile()) result.push(fPath)
        })
    })(startPath)
    return result
})([])
