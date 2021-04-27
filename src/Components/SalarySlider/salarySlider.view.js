import React from 'react';
import styles from './salarySlider.module.css';

const SalarySlider = ({ value, onChange }) => (
  <div className={styles.slider}>
    <div className={styles.sliderAndNumbers}>
      <span className={styles.numberLeft}>14.000€</span>
      <input
        className={styles.sliderItself}
        type="range"
        min="14000"
        max="200000"
        step="2000"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={styles.numberLeft}>200.000€</span>
    </div>
    <p className={styles.salaryDisplay}>{`${value} €`}</p>
  </div>
);

export default SalarySlider;
