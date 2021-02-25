import styles from './index.module.css';

export default function NumberWidget({ setNum, style }) {
  return (
    <div className={styles.component} style={style}>
      <div
        className={styles.num}
        onClick={() => {
          setNum(1);
        }}>
        1
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(2);
        }}>
        2
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(3);
        }}>
        3
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(4);
        }}>
        4
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(5);
        }}>
        5
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(6);
        }}>
        6
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(7);
        }}>
        7
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(8);
        }}>
        8
      </div>
      <div
        className={styles.num}
        onClick={() => {
          setNum(9);
        }}>
        9
      </div>
    </div>
  );
}
