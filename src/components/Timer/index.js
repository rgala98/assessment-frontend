import React, { useEffect } from "react";

import styles from "./index.module.css";

const Timer = ({ value, setValue }) => {
  // this useEffect handles an interval, which adds +1 to the timer every second,
  // the interval also increments the minutes (when the timer is at 59 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (value.seconds < 59) {
        setValue({ minutes: value.minutes, seconds: value.seconds + 1 });
      } else {
        setValue({ minutes: value.minutes + 1, seconds: 0 });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  // this function converts the time object to a string
  // from { minutes: 0, seconds: 42 }
  // to '00:42'
  const timeToString = (timeObject) => {
    let minutes = timeObject.minutes;
    let seconds = timeObject.seconds;
    minutes < 10 ? (minutes = `0${minutes}`) : (minutes = `${minutes}`);
    seconds < 10 ? (seconds = `0${seconds}`) : (seconds = `${seconds}`);
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.component}>Time elapsed: {timeToString(value)}</div>
  );
};

export default Timer;
