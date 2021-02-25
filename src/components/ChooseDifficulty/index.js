import styles from './index.module.css';

const ChooseDifficulty = ({ value, setValue }) => {
  return (
    <div className={styles.component}>
      <div className={styles.inpGroup}>
        <input
          name='diff'
          id='diff_easy'
          type='radio'
          value='easy'
          onChange={(e) => {
            setValue(e.target.value);
          }}
          checked={value === 'easy'}
        />
        <label htmlFor='diff_easy'>Easy</label>
      </div>

      <div className={styles.inpGroup}>
        <input
          name='diff'
          id='diff_medium'
          type='radio'
          value='medium'
          onChange={(e) => {
            setValue(e.target.value);
          }}
          checked={value === 'medium'}
        />
        <label htmlFor='diff_medium'>Medium</label>
      </div>

      <div className={styles.inpGroup}>
        <input
          name='diff'
          id='diff_hard'
          type='radio'
          value='hard'
          onChange={(e) => {
            setValue(e.target.value);
          }}
          checked={value === 'hard'}
        />
        <label htmlFor='diff_hard'>Hard</label>
      </div>

      <div className={styles.inpGroup}>
        <input
          name='diff'
          id='diff_expert'
          type='radio'
          value='expert'
          onChange={(e) => {
            setValue(e.target.value);
          }}
          checked={value === 'expert'}
        />
        <label htmlFor='diff_expert'>Expert</label>
      </div>
    </div>
  );
}

export default ChooseDifficulty;
