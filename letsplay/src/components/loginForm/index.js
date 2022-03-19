/* eslint consistent-return: off */

import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';
import { CustomTextField } from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';
import { login } from '../../api';

import './loginForm.css';

function LoginForm({ setFlip }) {
  const style = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const goToForgetPassword = () => {
    setFlip(true);
  };

  const goToRegister = () => {
    history.push('/register');
  };

  const validateEmail = () => {
    const validated = !email || email === '';
    setErrorEmail(validated);

    return !validated;
  };

  const validatePassword = () => {
    const validated = !password || password === '';
    setErrorPassword(validated);

    return !validated;
  };

  const validateInputs = () => {
    validateEmail();
    validatePassword();

    return validateEmail() && validatePassword();
  };
  const auth = async () => {
    if (validateInputs()) {
      const result = await login(email, password, setIsLoading);

      if (result) {
        const { token, user } = result.data;

        await localStorage.setItem('letsplay_token', token);

        toast(`Bem-vindo de volta ${user.name}!`);
        window.location.replace('/home');
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      auth();
    }
  };

  return (
    <>
      <form className={style.form}>
        <CustomTextField
          className={style.bottomSpace}
          label="Email"
          error={errorEmail}
          variant="outlined"
          value={email}
          onKeyDown={handleKeyDown}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Senha"
          error={errorPassword}
          variant="outlined"
          type="password"
          value={password}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton size="large" className={style.bottomSpace} onClick={auth}>
          Entrar
        </CustomButton>
        <div className="login-two-buttons">
          <a className="login-buttons" onClick={goToRegister}>
            Cadastre-se
          </a>
          <a className="login-forget-password" onClick={goToForgetPassword}>
            Esqueceu a senha?
          </a>
        </div>
        <div className={style.spinner}>{isLoading && <CircularProgress color="inherit" />}</div>
      </form>
    </>
  );
}

export default LoginForm;
