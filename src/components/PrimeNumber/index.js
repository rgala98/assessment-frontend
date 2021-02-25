import React, { useState } from "react";
import styles from "./index.module.css";

const PrimeNumber = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Seperating numbers from the string entered
    const arr = numbers.split(",").map(item => item.trim());
    var result = "";

    for (let i = 0; i < arr.length; i++) {
      if (/\D/.test(arr[i])) {
          // Test for only numbers to be checked
        result = "Please enter numbers seperated by commas!";
        break;
      }
      result += `${arr[i]} is ${
        isPrime(arr[i]) ? "a prime number " : "not a prime number"
      }\n`;
    }

    setResult(result);
  };

  const isPrime = (num) => {
    // Checking for number is prime or not

    const sqrtNum = Math.sqrt(num);
    for (let i = 2; i <= sqrtNum; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  };

  return (
    <div className={`container`}>
      <div className={`${styles.primeNumber}`}>
        <h1 className={`${styles.title}`}>Prime numbers</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            className={styles.inputArea}
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="Enter Number(s) 10,22,38,39, 100000015333.."
            type="text"
            name="numbers"
            cols="50"
            required
          />
          <button type="submit" className={`${styles.findBtn}`}>
            Check
          </button>
        </form>
        <p className={styles.result}>{result}</p>
      </div>
    </div>
  );
};

export default PrimeNumber;
