let map = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(l => l.split('').map(Number))

function of(n){
  return n > 9? n - 9 : n;
}
let newmap = []
map = map.map(row => [
  ...row,
  ...(row.map(x => of(x+1))),
  ...(row.map(x => of(x+2))),
  ...(row.map(x => of(x+3))),
  ...(row.map(x => of(x+4))),
])

newmap = newmap.concat(map)
newmap = newmap.concat(map.map(r => r.map(x => of(x+1))))
newmap = newmap.concat(map.map(r => r.map(x => of(x+2))))
newmap = newmap.concat(map.map(r => r.map(x => of(x+3))))
newmap = newmap.concat(map.map(r => r.map(x => of(x+4))))
map = newmap

let height = map.length;
let width = map[0].length;

function getNeighbours(x, y) {
  let neighbours = [];
  if(x > 0) neighbours.push([x-1, y]);
  if(y > 0) neighbours.push([x, y-1]);
  if(x + 1 < height) neighbours.push([x+1, y]);
  if(y + 1 < width) neighbours.push([x, y+1]);
  return neighbours;
}

let start = [0,0];
let end = [height - 1, width - 1];

let distances = [];
let visited = [];
let queue = [start]
visited[start] = true;

for(let i= 0; i<height; i++){
  for(let j= 0; j<width; j++){
    distances[[i,j]] = +Infinity;
    visited[[i,j]] = false;
  }
}

distances[start] = 0;

while (queue.length > 0){
  let curr = queue[0];
  for(let i=0; i < queue.length; i++){
    let q = queue[i]
    if(distances[q] < distances[curr])
      curr = q
  }
  queue = queue.filter(e => e[0] !== curr[0] || e[1] !== curr[1]);

  if(curr[0] === end[0] && curr[1] === end[1]){
    console.log(distances[curr]);
    break;
  }

  getNeighbours(curr[0], curr[1]).forEach(pos => {
    if(visited[pos]) return;
    let cost = map[pos[0]][pos[1]] + distances[curr];
    if (cost < distances[pos]) {
      distances[pos] = cost;
    }
    visited[pos] = true;
    queue.push(pos);
  });
}
