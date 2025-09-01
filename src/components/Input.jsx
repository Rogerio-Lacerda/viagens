import React from 'react';
import styles from '../styles/components/Input.module.css';

const Input = ({ id, label, onChange, ...props }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} onChange={onChange} {...props} />
    </div>
  );
};

export default Input;
