console.log(require('fs').readFileSync('input','utf8').trim().split('\n').map(x =>x.split(' | ')[1].split(' ').filter(y=>[2,4,3,7].indexOf(y.length)>-1).length).reduce((a,b)=>a+b))
