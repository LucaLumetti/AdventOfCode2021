let input = require('fs').readFileSync('input', 'utf8').trim().split('\n')

let brackets = ['([{<', ')]}>']
let open = brackets[0]
let close = brackets[1]
let points = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

function error_checking(str){
  let stack = []
  for(let i=0; i<str.length; i++){
    if(open.includes(str[i])){
      stack.push(str[i])
    } else if(close.includes(str[i])){
      if(stack.length == 0){
        return []
      } else if(close.indexOf(str[i]) != open.indexOf(stack.pop())){
        return []
      }
    }
  }
  return stack
}

let t = []
input.forEach(x =>{
  let total = 0
  let stack = error_checking(x)

  if(stack.length == 0) return
  let compl = stack.reverse()
  compl.forEach(y =>{
    total = total*5 + points[y]
  })
  t.push(total)
})
t.sort((a,b) => a-b)
console.log(t[Math.floor(t.length/2)])
