let input = require('fs').readFileSync('input','utf-8').trim().split('\n')
let gamma = 0

for(let i = 0; i < input[0].length; i++){
  gamma <<= 1;
  let bit = 0;
  for(let j = 0; j < input.length; j++){
    bit += input[j][i] == '1' ? 1 : -1;
  }
  gamma += bit > 0
}

console.log(gamma*((~gamma)&(~(~0<<input[0].length))))
