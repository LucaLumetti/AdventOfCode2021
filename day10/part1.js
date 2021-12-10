let input = require('fs').readFileSync('input', 'utf8').trim().split('\n')

let brackets = ['([{<', ')]}>']
let open = brackets[0]
let close = brackets[1]
let points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

function error_checking(str){
  let stack = []
  let error = false
  for(let i=0; i<str.length; i++){
    if(open.includes(str[i])){
      stack.push(str[i])
    } else if(close.includes(str[i])){
      if(stack.length == 0){
        return
      } else if(close.indexOf(str[i]) != open.indexOf(stack.pop())){
        error = str[i]
      }
    }
  }
  return error
}

let total = 0
input.forEach(x =>{
  let error = error_checking(x)
  if(!error) return
  total += points[error]
})
console.log(total)
