import { useContext } from "react";
import { MatrixContext } from "../../context/matrixContextAPI";
import { duplicateMatrix } from "../../context/matrixFunctions";
import styles from "./index.modules.css";

export default function Hints({ value, setValue, setHintsUsed }) {
  const { matrixes, setMatrixes } = useContext(MatrixContext);

  const clickHint = () => {
    if (value > 0) {
      // allow the 'while' loop only if game-board is NOT complete
      let runLoop = false;
      matrixes.played.forEach((row) => {
        row.forEach((col) => {
          if (col === "") {
            runLoop = true;
          }
        });
      });

      // target random cell from displayed matrix, and if it's empty reveal it's number according to raw matrix.
      while (runLoop) {
        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        if (matrixes.played[i][j] === "") {
          let revealNumber = matrixes.complete[i][j];
          let copyOfPlayedMatrix = duplicateMatrix(matrixes.played);
          copyOfPlayedMatrix[i][j] = revealNumber;
          setMatrixes({ ...matrixes, played: copyOfPlayedMatrix });

          // update hint counters
          setValue((prevState) => prevState - 1);
          setHintsUsed((prevState) => prevState + 1);
          break;
        }
      }
    }
  };

  return (
    <div className={styles.component}>
      <h1 className={styles.component__h1}>Hints Remaining: {value}</h1>
      <button onClick={clickHint}>Hint</button>
    </div>
  );
}
