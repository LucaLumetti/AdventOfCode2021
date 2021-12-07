let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(Number)
let align = input.reduce((a, b) => a + b)/input.length
align = [Math.floor(align), Math.ceil(align)]
function sum_n(n) {return n*(n+1)/2}
align = align.map(a => input.map(x => sum_n(Math.abs(x-a))).reduce((a, b) => a + b))
console.log(Math.min(...align))
