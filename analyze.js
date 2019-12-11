/**
 * 数据处理
 * @param {*压缩之前大小} before 
 * @param {*压缩之后大小} after 
 */

module.exports = (before, after) => {
    return {
        before: (before / 1024).toFixed(1) + 'KB',
        after: (after / 1024).toFixed(1) + 'KB',
        precent: (100 * (1 - after / before)).toFixed(1) + '%'
    }
}