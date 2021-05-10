import React, { useEffect, useState } from 'react';
import styles from './inputText.module.css';

const InputText = ({ labelText, handleOnChange, width, value }) => {
  const [labelStyle, setLabelStyle] = useState(`${styles.inputLabel}`);
  const [bodyStyle, setBodyStyle] = useState(`${styles.inputBody}`);
  const [fieldStyle, setFieldStyle] = useState(`${styles.inputField}`);
  const [fieldValue, setFieldValue] = useState('');

  useEffect(() => {
    if (fieldValue === '') {
      setLabelStyle(`${styles.inputLabel}`);
      setBodyStyle(`${styles.inputBody}`);
      setFieldStyle(`${styles.inputField}`);
    } else {
      setLabelStyle(`${styles.inputLabel} ${styles.inputLabelFilled}`);
      setBodyStyle(`${styles.inputBody} ${styles.inputBodyFilled}`);
      setFieldStyle(`${styles.inputField} ${styles.inputFieldFilled}`);
    }
  }, [fieldValue]);

  return (
    <div style={{ width: `${width}` }} className={bodyStyle}>
      <p className={labelStyle}>{labelText}</p>
      <br />
      <input
        className={fieldStyle}
        type="text"
        value={value}
        onChange={(e) => {
          setFieldValue(e.target.value);
          handleOnChange(e.target.value);
        }}
      />
    </div>
  );
};

export default InputText;
