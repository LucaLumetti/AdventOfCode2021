let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.split('').map(Number));

let alfa = '#abcdefghijklmnopqrstuvwxyz'.split('');

class Basin {
  constructor(area, pos, value) {
    this.x = pos.x
    this.y = pos.y
    this.value = value
    this.is_basin = 0
    this.area = area
  }

  get_neighbors() {
    let neighbors = [];
    if (this.x > 0) {
      let b = area.basins.get(`${this.x - 1},${this.y}`)
      neighbors.push(b)
    }
    if (this.x < input[0].length - 1) {
      let b = area.basins.get(`${this.x + 1},${this.y}`)
      neighbors.push(b)
    }
    if (this.y > 0) {
      let b = area.basins.get(`${this.x},${this.y - 1}`)
      neighbors.push(b)
    }
    if (this.y < input.length - 1) {
      let b = area.basins.get(`${this.x},${this.y + 1}`)
      neighbors.push(b)
    }
    return neighbors
  }
}

class Area {
  constructor (input) {
    this.basins_ids = 1
    this.set_this_round = []
    this.basins = new Map()
    this.changed = false
    input.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.basins.set(
          `${x},${y}`,
          new Basin(this, {x, y}, input[y][x])
        )
      });
    });
  }

  set_basins() {
    this.changed = false
    this.basins.forEach(b => {
      if(b.is_basin === 0){
        if(b.get_neighbors().filter(n => n.value < b.value).length === 0) {
          b.is_basin = this.basins_ids
          this.changed = true
          this.basins_ids++
        }
      }
      if(b.is_basin === 0) return
      if(b.value === 9) return
      let neigh = b.get_neighbors()
        .filter(n => n.value > b.value && n.value < 9)
        .filter(n => n.is_basin === 0)
      if(neigh.length === 0) return
      neigh.forEach(n => {
        this.changed = true
        n.is_basin = b.is_basin
      })

    })
  }

  get_basins_sizes(){
    let count = {}
    this.basins.forEach(b => {
      if(b.is_basin === 0) return
      if(!count[b.is_basin]) count[b.is_basin] = 0
      count[b.is_basin]++
    })
    return count
  }
}


let area = new Area(input)

do {
  area.set_basins()
}while(area.changed)

let basins = area.get_basins_sizes()
let sorted_basins = Object.keys(basins).sort((a,b) => basins[b] - basins[a])
console.log(basins[sorted_basins[0]]*basins[sorted_basins[1]]*basins[sorted_basins[2]])

