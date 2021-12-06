let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.split(' -> ').map(y => y.split(',').map(Number)))

let max = input.flat(Infinity).reduce((a, b) => Math.max(a, b)) + 1
world = new Array(max).fill(0).map(() => new Array(max).fill(0))

input.forEach(l => {
  let x1 = l[0][0]
  let y1 = l[0][1]
  let x2 = l[1][0]
  let y2 = l[1][1]

  while(true){
    world[x1][y1] += 1
    if(x1 == x2 && y1 == y2) break
    if(x1 > x2) x1--
    else if(x1 < x2) x1++
    if(y1 > y2) y1--
    else if(y1 < y2) y1++
  }
})

world = world.flat().filter(a => a >= 2).length
console.log(world)
