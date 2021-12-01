let input = require('fs').readFileSync('input', 'utf-8').trim().split('\n').map(Number)

input = input.map((v, i, arr) => {
  if(i == 0 || i == 1) return 0
  return arr[i] + arr[i - 1] + arr[i - 2]
})

input.shift()
input.shift()

input = input.reduce((a,b,c,d)=>!!c*(a+(b>d[c-1])),0))
console.log(input)
