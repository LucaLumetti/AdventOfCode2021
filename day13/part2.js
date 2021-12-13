let input = require('fs').readFileSync('input', 'utf8').trim().split('\n\n')
let coords = input[0].trim().split('\n').map(l => l.split(',').map(Number))
let folds = input[1].trim().split('\n').map(l => l.split('=')).map(l => [l[0][11], Number(l[1])])

let max_x = Math.max(...coords.map(c => c[0]))
let max_y = Math.max(...coords.map(c => c[1]))

let paper = new Array(max_y + 1).fill(0).map(() => new Array(max_x + 1).fill(' '))

let paper_length_x = paper[0].length
let paper_length_y = paper.length

coords.forEach(c => {
  let x = c[0]
  let y = c[1]
  paper[y][x] = '█'
})

function print_paper() {
  for(let y = 0; y < paper_length_y; y++) {
    for(let x = 0; x < paper_length_x; x++) {
      process.stdout.write(paper[y][x])
    }
    process.stdout.write('\n')
  }
  process.stdout.write('\n')
}

// fold the matrix paper alog the given x
function fold_paper_x(fold_x) {
  for(let y = 0; y < paper_length_y; y++) {
    for(let x = 0; x < paper_length_x; x++) {
      if(x >= fold_x) continue
      if(fold_x*2 - x >= paper_length_x) continue
      if(paper[y][fold_x*2 - x] === '█') {
        paper[y][x] = '█'
        paper[y][fold_x*2 - x] = 'x'
      }
    }
  }
  paper_length_x = fold_x
}

function fold_paper_y(fold_y) {
  for(let x = 0; x < paper_length_x; x++) {
    for(let y = 0; y < paper_length_y; y++) {
      if(y >= fold_y) continue
      if(fold_y*2 - y >= paper_length_y) continue
      if(paper[fold_y*2 - y][x] === '█') {
        paper[y][x] = '█'
        paper[fold_y*2 - y][x] = ''
      }
    }
  }
  paper_length_y = fold_y
}

folds.forEach(f => {
  if(f[0] == 'x') {
    fold_paper_x(f[1])
  } else {
    fold_paper_y(f[1])
  }
})
print_paper()
