/* eslint consistent-return: off */

import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';

import RegisterForm from '../../components/registerForm';
import logo from '../login/logo.png';

import '../login/login.css';

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
