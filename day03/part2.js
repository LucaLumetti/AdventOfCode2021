let input = require('fs').readFileSync('input', 'utf8').trim().split('\n');
let oxygen = input
let cotwo = input

for(let i = 0; i < oxygen[0].length; i++){
  let mcbit = 0;
  for(let j = 0; j < oxygen.length; j++){
    mcbit += oxygen[j][i] == '1' ? 1 : -1
  }
  mcbit = mcbit >= 0 ? '1' : '0'
  oxygen = oxygen.filter(x => x[i] == mcbit)
}

for(let i = 0; i < cotwo[0].length; i++){
  let one = 0
  let zero = 0
  let lcbit = 0
  for(let j = 0; j < cotwo.length; j++){
    if(cotwo[j][i] == '1') one += 1
    else zero += 1
  }

  if(zero == 0) lcbit = '1'
  else if(one == 0 || zero <= one) lcbit = '0'
  else lcbit = '1'
  cotwo = cotwo.filter(x => x[i] == lcbit)
}

console.log(parseInt(oxygen[0],2)*parseInt(cotwo[0],2))
