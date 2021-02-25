import React, { useState, useContext } from "react";
import { MatrixContext } from "../../context/matrixContextAPI";
import { duplicateMatrix } from "../../context/matrixFunctions";
import NumberWidget from "../NumberWidget";


import styles from "./index.module.css";



const SudokuTable = () => {
  const { matrixes, setMatrixes } = useContext(MatrixContext);
  const [clickedCell, setClickedCell] = useState({ i: null, j: null }); // cell cordinates for NumberWidget value
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [isSetNumMode, setIsSetNumMode] = useState(false); 

  const clickCell = (e, i, j) => {
    setClickedCell({ i: i, j: j });
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsSetNumMode(true);
  };

  const clickNumberOnWidget = (num) => {
    let copyOfPlayedMatrix = duplicateMatrix(matrixes.played);
    copyOfPlayedMatrix[clickedCell.i][clickedCell.j] = num;
    setMatrixes({ ...matrixes, played: copyOfPlayedMatrix });
    setIsSetNumMode(false);
  };

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          {matrixes.played.map((row, i) => (
            <tr key={i}>
              {row.map((num, j) =>
                matrixes.filtered[i][j] === "" ? (
                  <td
                    key={`${i}-${j}`}
                    onClick={(e) => {
                      clickCell(e, i, j);
                    }}
                  >
                    {num}
                  </td>
                ) : (
                  <td key={`${i}-${j}`} className={styles.computed}>
                    {num}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

       {isSetNumMode && (
        <NumberWidget
          style={{
            position: "fixed",
            top: mousePosition.y,
            left: mousePosition.x,
          }}
          setNum={(num) => {
            clickNumberOnWidget(num);
          }}
        />
      )} 
    </div>
  );
};

export default SudokuTable;
