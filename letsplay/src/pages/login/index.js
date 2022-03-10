/* eslint consistent-return: off */

import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

import LoginForm from '../../components/loginForm';
import ForgetPassword from '../../components/forgetPassword';
import logo from './logo.png';

import './login.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function Login() {
  const style = useStyles();

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="login-background">
      <img src={logo} alt="LOGO" className="login-logo" />
      <Container maxWidth="xs" className={style.root}>
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          containerStyle={{ width: '100%' }}
        >
          <LoginForm setFlip={setIsFlipped} />
          <ForgetPassword setFlip={setIsFlipped} />
        </ReactCardFlip>
      </Container>
    </div>
  );
}

export default Login;
