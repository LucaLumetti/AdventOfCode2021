let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(Number)
let timer = new Array(9).fill(0);

timer = timer.map((x,i) => input.filter(y => y === i).length)

for(let d = 0; d < 80; d++) {
	timer.push(timer.shift())
  timer[6] += timer[8]
}

console.log(timer.reduce((a,b) => a+b))
