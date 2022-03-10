/* eslint consistent-return: off */

import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import { CustomTextField } from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';
import { login, createUser } from '../../api';
import Spinner from '../spinnerLoading';

import '../loginForm/loginForm.css';

const useStyles = makeStyles({
  twoFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomSpace: {
    marginBottom: '30px',
  },
  center: {
    alignSelf: 'center',
  },
});

export default function RegisterForm() {
  const style = useStyles();
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const goToLogin = () => {
    history.push('/');
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

  const validateConfirmPassword = () => {
    const validated = !confirmPassword || confirmPassword === '';
    setErrorConfirmPassword(validated);

    return !validated;
  };

  const validateName = () => {
    const validated = !name || name === '';
    setErrorName(validated);

    return !validated;
  };

  const validateLastName = () => {
    const validated = !lastName || lastName === '';
    setErrorLastName(validated);

    return !validated;
  };

  const validatePhone = () => {
    const validated = !phoneNumber || phoneNumber === '';
    setErrorPhoneNumber(validated);

    return !validated;
  };

  const validateInputs = () => {
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateName();
    validateLastName();
    validatePhone();

    return (
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateName() &&
      validateLastName() &&
      validatePhone()
    );
  };
  const samePasswords = () => password === confirmPassword;

  const auth = () => {
    if (!validateInputs()) {
      // error nos inputs nao preenchidos
      return false;
    }

    if (!samePasswords()) {
      // toast passwords diferentes
      return false;
    }

    return true;
  };

  const registerRequest = async () => {
    if (auth()) {
      const resultRegister = await createUser(
        name,
        lastName,
        phoneNumber,
        email,
        password,
        setIsLoading
      );

      if (resultRegister) {
        const resultLogin = await login(email, password, setIsLoading);

        if (resultLogin) {
          const { token, user } = resultLogin.data;

          await localStorage.setItem('letsplay_token', token);

          toast(`Bem-vindo ${user.name}!`);
          window.location.replace('/home');
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      registerRequest();
    }
  };

  return (
    <>
      <form style={{ marginTop: '60px', flexDirection: 'column', display: 'flex', width: '100%' }}>
        <div className={`${style.twoFields} ${style.bottomSpace}`}>
          <CustomTextField
            style={{ width: '48%' }}
            label="Nome*"
            error={errorName}
            variant="outlined"
            value={name}
            onKeyDown={handleKeyDown}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomTextField
            style={{ width: '48%' }}
            label="Sobrenome*"
            error={errorLastName}
            variant="outlined"
            value={lastName}
            onKeyDown={handleKeyDown}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <CustomTextField
          className={style.bottomSpace}
          label="Email*"
          error={errorEmail}
          variant="outlined"
          value={email}
          onKeyDown={handleKeyDown}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Telefone*"
          error={errorPhoneNumber}
          variant="outlined"
          value={phoneNumber}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Senha*"
          error={errorPassword}
          variant="outlined"
          type="password"
          value={password}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Confirmar senha*"
          error={errorConfirmPassword}
          variant="outlined"
          type="password"
          value={confirmPassword}
          onKeyDown={handleKeyDown}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <CustomButton size="large" className={style.bottomSpace} onClick={registerRequest}>
          Registrar-se
        </CustomButton>
        <div className="login-two-buttons">
          <a
            className="login-forget-password"
            style={{ fontWeight: 'bold', color: 'rgb(4, 81, 105)' }}
            onClick={goToLogin}
          >
            Já possui login? Entrar
          </a>
        </div>
        {isLoading && <Spinner className={style.center} />}
      </form>
    </>
  );
}
