import React, { useContext, useState } from "react";

import { MatrixContext } from "../../context/matrixContextAPI";
import { duplicateMatrix } from "../../context/matrixFunctions";

import SudokuTable from "../SudokuTable";
import Timer from "../Timer";
import ChooseDifficulty from "../ChooseDifficulty";
import Hints from "../Hints";

import styles from "./index.module.css";

import axios from "axios";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const SudokuGame = () => {
  // the sudoku matrixes (3 of them) are held and handled in Context API
  const {
    matrixes,
    setMatrixes,
    prepMatrixesForStartGame,
    prepMatrixesForEndGame,
  } = useContext(MatrixContext);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([]);

  const [columnData, setColumnData] = useState([
    { headerName: "Player Name", field: "player_name" },
    { headerName: "Time", field: "time", sortable: true },
  ]);

  const [startGame, setStartGame] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [hints, setHints] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const clickStartGame = () => {
    // create and set all 3 required matrixes,
    prepMatrixesForStartGame(difficulty);
    // set timer
    setTimer({ minutes: 0, seconds: 0 });
    switch (difficulty) {
      case "easy":
        setHints(10);
        break;
      case "medium":
        setHints(8);
        break;
      case "hard":
        setHints(5);
        break;
      case "expert":
        setHints(3);
        break;
      default:
        break;
    }
    // and toggle the UI

    setStartGame(true);
  };

  const clickReset = () => {
    // reset the played matrix with the filtered matrix
    setMatrixes({ ...matrixes, played: matrixes.filtered });
    // reset timer & hints
    setTimer({ minutes: 0, seconds: 0 });
    // add +1 to the reset count
    switch (difficulty) {
      case "easy":
        setHints(10);
        break;
      case "medium":
        setHints(8);
        break;
      case "hard":
        setHints(5);
        break;
      case "expert":
        setHints(3);
        break;
      default:
        break;
    }
  };

  const clickSolve = () => {
    let isSuccess = true,
      copyOfPlayedMatrix = duplicateMatrix(matrixes.played);

    // target each cell of the played matrix, and compare with the same cell on the complete matrix,
    // return false only if an error has been recognized
    matrixes.played.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== matrixes.complete[i][j]) {
          // this clears the errors
          copyOfPlayedMatrix[i][j] = "";
          isSuccess = false;
        }
      });
    });

    if (isSuccess) {
      window.alert("Congratulations! You finished the puzzle!");

      var player_name = window.prompt("Enter Player Name", "");
      var time = timer.minutes + ":" + timer.seconds;

      addToLeaderboard(player_name, time);

      // then reset all states (because component does not unmount, it's children swap)
      prepMatrixesForEndGame();
      setTimer({ minutes: 0, seconds: 0 });
      setHints(0);
      setHintsUsed(0);
      // and toggle the UI
      setStartGame(false);
    } else {
      window.alert("Puzzle is incorrect, clearing error(s), try again...");
      setMatrixes({ ...matrixes, played: copyOfPlayedMatrix });
    }
  };

  const addToLeaderboard = (player_name, time) => {
    const params = JSON.stringify({ player_name: player_name, time: time });
    axios
      .post("http://localhost:5000/api/leaderboard", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        alert("Added to Leaderboard");
      })
      .catch(function (error) {
        alert("Error getting data please refresh");
        console.log("Error" + error);
      });
  };

  const getLeaderboard = () => {
    axios
      .get("http://localhost:5000/api/leaderboard", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        setRowData(response.data);
      })
      .catch(function (error) {
        alert("Error getting data please refresh");
        console.log("Error" + error);
      });
  };

  if (!startGame) {
    return (
      <div className={`${styles.app}`}>
        <div className={`${styles.startGroup}`}>
          <ChooseDifficulty value={difficulty} setValue={setDifficulty} />
          <button onClick={clickStartGame}>Start Game</button>
        </div>
        <SudokuTable startGame={startGame} />
      </div>
    );
  } else {
    return (
      <div className={`${styles.app}`}>
        <Timer value={timer} setValue={setTimer} />
        <Hints value={hints} setValue={setHints} setHintsUsed={setHintsUsed} />
        <SudokuTable startGame={startGame} />
        <div className={styles.controls}>
          <button onClick={clickReset}>Reset</button>
          <button onClick={clickSolve}>Solve</button>
        </div>
        <div className={`ag-theme-material ${styles.database}`}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnData}
            onGridReady={getLeaderboard}
          ></AgGridReact>
        </div>
      </div>
    );
  }
};

export default SudokuGame;
