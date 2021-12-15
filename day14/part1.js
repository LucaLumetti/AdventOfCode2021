let input = require('fs').readFileSync('input', 'utf8').trim().split('\n\n');

let template = {}
let count = {}

let t = input[0].trim().split('')
for(let i = 0; i < t.length-1; i++) {
  count[t[i]] = (count[t[i]] || 0) + 1
  template[`${t[i]}${t[i+1]}`] = (template[`${t[i]}${t[i+1]}`] || 0) + 1
}

count[t[t.length-1]] = (count[t[t.length-1]] || 0) + 1

let pairs = new Map()
input = input[1].trim().split('\n').map(x => x.split(' -> '))
input.forEach(p => pairs.set(p[0], p[1]))

for(let i = 0; i < 10; i++){
  let new_template = {...template}

  Object.keys(template).forEach(k => {
    if(template[k] <= 0) return
    if(!pairs.has(k)) return

    let c = pairs.get(k)
    let [p1, p2] = [`${k[0]}${c}`, `${c}${k[1]}`]
    let n = template[k]

    count[c] = (count[c] || 0) + n
    new_template[k] -= n

    new_template[p1] = (new_template[p1] || 0) + n
    new_template[p2] = (new_template[p2] || 0) + n
  })

  template = new_template
}

let max = -Infinity
let min = Infinity

Object.keys(count).forEach(k => {
  if(max < count[k]) max = count[k]
  if(min > count[k]) min = count[k]
})

console.log(max-min)
