/* eslint consistent-return: off */

import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, makeStyles } from '@material-ui/core';

import { CustomTextField } from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';
import { login } from '../../api';

import './loginForm.css';

const useStyles = makeStyles({
  bottomSpace: {
    marginBottom: '30px',
  },
  center: {
    alignSelf: 'center',
  },
});

function LoginForm({ flip }) {
  const style = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const goToForgetPassword = () => {
    flip(true);
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

  return (
    <>
      <form style={{ marginTop: '60px', flexDirection: 'column', display: 'flex', width: '100%' }}>
        <CustomTextField
          className={style.bottomSpace}
          label="Email"
          error={errorEmail}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Senha"
          error={errorPassword}
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton size="large" className={style.bottomSpace} onClick={auth}>
          Entrar
        </CustomButton>
        <div className="login-two-buttons">
          <a
            className="login-forget-password"
            style={{ fontWeight: 'bold', color: 'rgb(4, 81, 105)' }}
            onClick={goToRegister}
          >
            Cadastre-se
          </a>
          <a className="login-forget-password" onClick={goToForgetPassword}>
            Esqueceu a senha?
          </a>
        </div>
        <div
          style={{
            width: 'fit-content',
            heigh: 'fit-content',
            margin: '20px auto',
            color: 'rgb(4, 81, 105)',
          }}
        >
          {isLoading && <CircularProgress color="inherit" />}
        </div>
      </form>
    </>
  );
}

export default LoginForm;
