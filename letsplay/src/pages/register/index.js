/* import React from 'react';

function Register() {
    return <h2>TELA DE CADASTRO</h2>
}

export default Register; */

/* eslint consistent-return: off */

import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

import RegisterForm from '../../components/registerForm';
import logo from '../login/logo.png';

import '../login/login.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cont: {
    display: 'flex',
    minHeight: '100vh',
  },
});

function Register() {
  const style = useStyles();

  return (
    <div className="login-background">
      <div className={style.cont}>
        <Container maxWidth="md" className={style.root}>
          <img src={logo} alt="LOGO" className="login-logo" style={{ margin: '0px auto' }} />
          <div style={{ width: '15%' }} />
          <RegisterForm />
        </Container>
      </div>
    </div>
  );
}

export default Register;
