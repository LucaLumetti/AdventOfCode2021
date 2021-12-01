console.log(require('fs').readFileSync('input','utf-8').trim().split('\n').map(Number).reduce((a,b,c,d)=>!!c*(a+(b>d[c-1])),0))
