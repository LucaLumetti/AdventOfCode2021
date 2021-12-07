let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(Number)

console.log(input.length)
input = input.sort(function(a,b){
  return a-b;
});

let align = input[input.length/2]

input = input.map(x => Math.abs(x-align)).reduce((a,b) => a+b)
console.log(input)
