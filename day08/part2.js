let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.split(' | ')).map(x => [x[0].split(' '), x[1].split(' ')])

let seven_seg = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg']

function check_solution(solution, mapping) {
  let letters = 'abcdefg'
  let valid = true
  for (let i = 0; i < solution.length; i++){
    l = letters[i]
    x = solution[i]
    for(let e of mapping){
      let e_1 = e[1].filter(y => y.indexOf(x) !== -1)
      if(e[0].indexOf(l) !== -1 && e_1.length === 0){
        return false
      } else if(e[0].indexOf(l) !== -1 && e_1.length > 0){
        mapping.set(e[0], e_1)
      }
    }
  }
  return true
}

function build_solution(solution, mapping){
  let valid = check_solution(solution, new Map(mapping))
  if(!valid) return null
  if(valid && solution.length === 7) return solution

  for(let x of "abcdefg".split('')){
    if(solution.indexOf(x) !== -1) {
      continue
    }
    let new_solution = solution.concat(x)
    let s = build_solution(new_solution, mapping)
    if(s && s.length == 7) return s
    new_solution.pop()
  }
}

let total = 0
input.forEach(entry => {
  let map = new Map()

  let full_entry = entry[0].concat(entry[1])
  full_entry.forEach(x => {
    let len = x.length
    let candidates = seven_seg.filter(y => y.length === len)
    map.set(x, candidates)
  })

  let s = build_solution([], map).join('')

  for(let i = 0; i < entry[1].length; i++){
    let x = entry[1][i]
    let new_x = ""
    for(let j = 0; j < x.length; j++){
      let c = x[j]
      let new_c = s['abcdefg'.indexOf(entry[1][i][j])]
      new_x += new_c
    }
    entry[1][i] = new_x.split('').sort().join('')
  }
  entry[1] = entry[1].map(x => seven_seg.indexOf(x))
  total += Number(entry[1].join(''))
})

console.log(total)
