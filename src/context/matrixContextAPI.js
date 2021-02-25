import { createContext, useState } from 'react';
import { createSudokuMatrix, duplicateMatrix, filterMatrixByDifficulty } from './matrixFunctions';

export const MatrixContext = createContext();

export const MatrixProvider = (props) => {
  const [matrixes, setMatrixes] = useState({
    complete: new Array(9).fill(new Array(9).fill('')), // original matrix, has all data
    filtered: new Array(9).fill(new Array(9).fill('')), // filtered by difficulty, kept for reset purpose
    played: new Array(9).fill(new Array(9).fill('')), // displayed matrix, manipulated by user
  });

  const prepMatrixesForStartGame = (difficulty) => {
    // create and set all 3 required matrixes
    let complete = createSudokuMatrix(9);
    let filtered = filterMatrixByDifficulty(duplicateMatrix(complete), difficulty);
    setMatrixes({ complete, filtered, played: filtered });
  };

  const prepMatrixesForEndGame = () => {
    // empty all matrixes
    setMatrixes({
      complete: new Array(9).fill(new Array(9).fill('')),
      filtered: new Array(9).fill(new Array(9).fill('')),
      played: new Array(9).fill(new Array(9).fill('')),
    });
  };

  return (
    <MatrixContext.Provider
      value={{ matrixes, setMatrixes, prepMatrixesForStartGame, prepMatrixesForEndGame }}>
      {props.children}
    </MatrixContext.Provider>
  );
};
