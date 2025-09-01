import React from 'react';
import styles from '../styles/components/Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/modo-aviao.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo avião" />
        <h1>GoBiz</h1>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Agendar viagens
        </NavLink>
        <NavLink
          to="/minhas-viagens"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Minhas viagens
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
