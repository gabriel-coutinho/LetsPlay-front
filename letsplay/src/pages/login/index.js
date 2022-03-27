/* eslint consistent-return: off */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';

import LoginForm from '../../components/loginForm';
import ForgetPassword from '../../components/forgetPassword';
import logo from './logo.png';

import './login.css';
import { verifyToken } from '../../api';

function Login() {
  const history = useHistory();
  const style = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);
  const [token] = useState(localStorage.getItem('letsplay_token'));

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (result) history.push('/home');
    }
  }, [token]);

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
