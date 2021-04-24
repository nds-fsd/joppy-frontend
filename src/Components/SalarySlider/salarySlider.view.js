import React from 'react';
import styles from './salarySlider.module.css';

const SalarySlider = ({ value, onChange }) => (
  <div className={styles.slider}>
    <input
      type="range"
      min="14000"
      max="200000"
      step="2000"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <p>{value}</p>
  </div>
);

export default SalarySlider;
