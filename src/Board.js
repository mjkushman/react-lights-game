import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board STATE nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values

    // This process just remembers the state of t/f grid. It's not the table itself to be rendered.
    const boardState = [...Array(nrows)].map(row => 
      [...Array(ncols)].map(col => Math.random() > chanceLightStartsOn)
     )
     return boardState // populates board variable
    }
    console.log('board',board)

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy);
      flipCell(y,x+1,boardCopy);
      flipCell(y,x-1,boardCopy);
      flipCell(y-1,x,boardCopy);
      flipCell(y+1,y,boardCopy);
      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return(<div>
      <h1>You won!</h1>
    </div>)
  }

  // TODO
  // make table board

  let gameBoard = []
  for(let y=0; y < nrows; y++ ){
    // add nrows of []
    let row = []
    // gameBoard.push([]) // add a row to board

    for(let x = 0; x < ncols; x++) {
      // add ncols of <Cell/>
      let coord = `${y}-${x}`
      row.push(
      <Cell 
        key={coord} 
        isLit={board[y][x]}
        flipCellsAroundMe={e => flipCellsAround(coord)}
        />
        ); // adds a cell to each column
      }
      gameBoard.push(<tr key={y}>{row}</tr>)
  }
  // console.log('gameboard',gameBoard)

  return (
  <table className="Board">
    <tbody>{gameBoard}</tbody>
  </table>
  );
}

export default Board;