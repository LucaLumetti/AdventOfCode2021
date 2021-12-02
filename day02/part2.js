let input = require('fs').readFileSync('input','utf-8').trim().split('\n')

let submarine = {
  pos: 0,
  depth: 0,
  aim: 0
}

input.forEach(v => {
  v = v.split(' ')
  v[1] = Number(v[1])
  if(v[0] == "forward"){
    submarine.pos += v[1]
    submarine.depth += submarine.aim*v[1]
  }
  if(v[0] == "down") submarine.aim += v[1]
  if(v[0] == "up") submarine.aim -= v[1]
})

console.log(submarine.pos * submarine.depth)
