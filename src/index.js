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

    const reverseElements = moves.reduce((move) => {
      return move.length !== 0 ? move : false;
    });

    console.log(reverseElements);

    if (!reverseElements) {
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
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  [i, j] = getDirectionIndex(direction, i, j);
  while (squares[i][j] === oppPlayer && i !== null && j !== null) {
    directionMoves.push([i,j]);
    [i, j] = getDirectionIndex(direction, i, j);
  }
  if (i && j && squares[i][j] === player) {
    return directionMoves;
  } else return [];
}

function getDirectionIndex(direction, i, j) {
  if (direction === 'left') {
    return i === 0 ? null : [i-1, j]
  } else if (direction === 'right') {
    return i === 7 ? null : [i+1, j]
  } else if (direction === 'top') {
    return j === 0 ? null : [i, j-1]
  } else if (direction === 'down') {
    return j === 7 ? null : [i, j+1]
  } else if (direction === 'leftup') {
    return (j === 0 && i === 0) ? null : [i-1, j-1]
  } else if (direction === 'leftdown') {
    return (j === 7 && i === 0) ? null : [i-1, j+1]
  } else if (direction === 'rightup') {
    return (j === 0 && i === 7) ? null : [i+1, j-1]
  } else if (direction === 'rightdown') {
    return (j === 7 && i === 7) ? null : [i+1, j+1]
  } else {
    return null;
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
