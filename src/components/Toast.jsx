import React from 'react';
import styles from '../styles/components/Toast.module.css';
import success from '../assets/carraca.png';
import error from '../assets/fechar.png';

const Toast = ({ type, texto }) => {
  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        {type === 'success' ? (
          <img src={success} alt="success" />
        ) : (
          <img src={error} alt="error" />
        )}

        <p>{texto}</p>
      </div>
      <div className={type === 'success' ? styles.success : styles.error}></div>
    </div>
  );
};

export default Toast;
