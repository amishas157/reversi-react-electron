import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(8).fill(null).map(() => Array(8).fill(null)),
      xIsNext: true
    };

    //initial state
    this.state.squares[3][3] = 'O';
    this.state.squares[3][4] = 'X';
    this.state.squares[4][3] = 'X';
    this.state.squares[4][4] = 'O';
  }

  handleClick(i, j) {
    const squares = this.state.squares.slice();
    if (squares[i][j]) {
      return;
    }
    const player = this.state.xIsNext ? 'X' : 'O';
    const moves = possibleMoves(squares, player, i, j)
    console.log(moves);
    console.log("sujith");
    
    const reverseElements = [];
    // TODO:: push all moves to reverseElements    
    moves.forEach(move => {
      if (move.length!==0){
        move.forEach(add_move=>{
          reverseElements.push(add_move)
        });
        // reverseElements.push(move[0]);
      }
    });

    if (reverseElements.length === 0) {
      return;
    }

    reverseElements.forEach((element) => {
      squares[element[0]][element[1]] = player;
      console.log(element);
    })

    squares[i][j] = player;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i, j) {
    return (
      <Square
        value={this.state.squares[i][j]}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  render() {
    let [x_count,y_count] = get_player_counts(this.state.squares);
    const winner = calculateWinner(x_count, y_count, this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    let player1_count = "Player X : " + x_count;
    let player2_count = "Player O : " + y_count;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="p1count">{player1_count}</div>
        <div className="p2count">{player2_count}</div>
        
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
          {this.renderSquare(0, 4)}
          {this.renderSquare(0, 5)}
          {this.renderSquare(0, 6)}
          {this.renderSquare(0, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(1, 4)}
          {this.renderSquare(1, 5)}
          {this.renderSquare(1, 6)}
          {this.renderSquare(1, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(2, 4)}
          {this.renderSquare(2, 5)}
          {this.renderSquare(2, 6)}
          {this.renderSquare(2, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(3, 4)}
          {this.renderSquare(3, 5)}
          {this.renderSquare(3, 6)}
          {this.renderSquare(3, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(4, 0)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(4, 2)}
          {this.renderSquare(4, 3)}
          {this.renderSquare(4, 4)}
          {this.renderSquare(4, 5)}
          {this.renderSquare(4, 6)}
          {this.renderSquare(4, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(5, 0)}
          {this.renderSquare(5, 1)}
          {this.renderSquare(5, 2)}
          {this.renderSquare(5, 3)}
          {this.renderSquare(5, 4)}
          {this.renderSquare(5, 5)}
          {this.renderSquare(5, 6)}
          {this.renderSquare(5, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 0)}
          {this.renderSquare(6, 1)}
          {this.renderSquare(6, 2)}
          {this.renderSquare(6, 3)}
          {this.renderSquare(6, 4)}
          {this.renderSquare(6, 5)}
          {this.renderSquare(6, 6)}
          {this.renderSquare(6, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(7, 0)}
          {this.renderSquare(7, 1)}
          {this.renderSquare(7, 2)}
          {this.renderSquare(7, 3)}
          {this.renderSquare(7, 4)}
          {this.renderSquare(7, 5)}
          {this.renderSquare(7, 6)}
          {this.renderSquare(7, 7)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function possibleMoves(squares, player, i, j) {
  const directions = ['left', 'right', 'top', 'down', 'leftup', 'leftdown', 'rightup', 'rightdown'];
  const moves = directions.map((direction) => {
    return getPossibleMovesInDirection(squares, direction, i, j, player);
  });
  return moves;
}

function getPossibleMovesInDirection(squares, direction, i, j, player) {
  const oppPlayer = player === 'X' ? 'O' : 'X';
  const directionMoves = [];
  if (getDirectionIndex(direction, i, j) == null ){
    return [];
  }
  [i, j] = getDirectionIndex(direction, i, j);
  while (squares[i][j] === oppPlayer && i !== null && j !== null) {
    directionMoves.push([i,j]);
    if (getDirectionIndex(direction, i, j) === null){
      return [];
    }
    [i, j] = getDirectionIndex(direction, i, j);
  }
  if (i && j && squares[i][j] === player) {
    return directionMoves;
  } else return [];
}

function getDirectionIndex(direction, i, j) {
   if (direction === 'left') {
    return j === 0 ? null : [i, j-1]
  } else if (direction === 'right') {
    return j === 7 ? null : [i, j+1]
  } else if (direction === 'top') {
    return i === 0 ? null : [i-1, j]
  } else if (direction === 'down') {   
    return i === 7 ? null : [i+1, j]
  } else if (direction === 'leftup') {
    return (j === 0 || i === 0) ? null : [i-1, j-1]
  } else if (direction === 'leftdown') {
    return (i === 7 || j === 0) ? null : [i+1, j-1]
  } else if (direction === 'rightup') {
    return (i === 0 || j === 7) ? null : [i-1, j+1]
  } else if (direction === 'rightdown') {
    return (j === 7 || i === 7) ? null : [i+1, j+1]
  } else {
    return null;
  }
}

function get_player_counts(squares){
  let x_count = 0;
  let o_count = 0;

  for (let i_iter = 0; i_iter < 8 ; i_iter++ ){
    for (let j_iter = 0;j_iter<8; j_iter++){
      if (squares[i_iter][j_iter] !== null && squares[i_iter][j_iter] !== 'O' ){
        x_count++;
      }
      else if (squares[i_iter][j_iter] !== null && squares[i_iter][j_iter] !== 'X' ){
        o_count++;
      }
    }
  }
  return [x_count,o_count];
}

function calculateWinner(x_count, o_count, squares) {
  // Winner can be calculated with the one having more number of places
  
  // TODO::Consider All possible values.

  // When All Blocks are filled. 
  if (x_count + o_count === squares.length *squares.length){
    if (x_count > o_count) {return 'Player X';}
    else if (x_count < o_count){return 'Player O';}
    else{
      return 'Draw'
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
