let input = require('fs').readFileSync('input', 'utf8').trim().split('\n\n');
let drawn = input[0].split(',').map(Number);
input.shift()
let boards = input.map(inp => inp.split('\n').map(x => x.trim().split(/\s+/).map(Number)));

class Board {
  constructor(id, board){
    this.id = id
    this.won = false;
    this.board = board;
    this.selected = new Array(board.length).fill(0).map(() => new Array(board.length).fill(0))
  }

  sel_number(n){
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board.length; j++){
        if(this.board[i][j] != n) continue;
        this.selected[i][j] = 1;
        return;
      }
    }
    return;
  }

  has_won(){
    if(this.won) return false;
    /* check all rows */
    for(let i = 0; i < this.board.length; i++){
      let row_win = true;
      for(let j = 0; j < this.board.length; j++){
        if(this.selected[i][j] == 0) row_win = false;
      }
      if(row_win){
        this.won = true;
        return true;
      }
    }

    /* check all columns */
    for(let i = 0; i < this.board.length; i++){
      let col_win = true;
      for(let j = 0; j < this.board.length; j++){
        if(this.selected[j][i] == 0) col_win = false;
      }
      if(col_win){
        this.won = true;
        return true;
      }
    }
  }

  value(){
    let sum = 0;
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board.length; j++){
        sum += this.board[i][j] * (this.selected[i][j] == 1?0:1);
      }
    }
    return sum
  }

}

boards = boards.map((board, idx) => new Board(idx, board));
drawn.forEach(n => {
  boards.forEach((board,idx) => {
    board.sel_number(n);
    if(board.has_won()){
      console.log(board.value()*n);
      process.exit(0)
    }
  });
});
// console.log(drawn)
// console.log(boards)
