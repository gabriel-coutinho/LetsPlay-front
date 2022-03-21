import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useStyles } from './styles';
import { CustomTextField } from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';

import {
  FORGET_PASSWORD_EMAIL,
  FORGET_PASSWORD_VERIFY_CODE,
  FORGERT_PASSWORD_CHANGE_PASSWORD,
} from '../../utils/contants';
import { forgetPassword, verifyCodeRequest, changePassword, login } from '../../api';

function ForgetPassword({ setFlip }) {
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const [nameButton, setNameButton] = useState(FORGET_PASSWORD_EMAIL.buttonName);
  const [nameInput, setNameInput] = useState(FORGET_PASSWORD_EMAIL.inputName);
  const [state, setState] = useState(FORGET_PASSWORD_EMAIL.state);

  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorVerifyCode, setErrorVerifyCode] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const resetStates = () => {
    setEmail('');
    setVerifyCode('');
    setPassword('');
    setConfirmPassword('');
    setNameButton(FORGET_PASSWORD_EMAIL.buttonName);
    setNameInput(FORGET_PASSWORD_EMAIL.inputName);
    setState(FORGET_PASSWORD_EMAIL.state);
  };

  const goToLogin = () => {
    resetStates();
    setFlip(false);
  };

  const typeInput = () => (state === FORGERT_PASSWORD_CHANGE_PASSWORD.state ? 'password' : '');

  const valueInput = () => {
    if (state === FORGET_PASSWORD_EMAIL.state) {
      return email;
    }
    if (state === FORGET_PASSWORD_VERIFY_CODE.state) {
      return verifyCode;
    }
    if (state === FORGERT_PASSWORD_CHANGE_PASSWORD.state) {
      return password;
    }
  };

  const onChangeInput = () => {
    if (state === FORGET_PASSWORD_EMAIL.state) {
      return (e) => setEmail(e.target.value);
    }
    if (state === FORGET_PASSWORD_VERIFY_CODE.state) {
      return (e) => setVerifyCode(e.target.value);
    }
    if (state === FORGERT_PASSWORD_CHANGE_PASSWORD.state) {
      return (e) => setPassword(e.target.value);
    }
  };

  const errorInput = () => {
    if (state === FORGET_PASSWORD_EMAIL.state) {
      return errorEmail;
    }
    if (state === FORGET_PASSWORD_VERIFY_CODE.state) {
      return errorVerifyCode;
    }
    if (state === FORGERT_PASSWORD_CHANGE_PASSWORD.state) {
      return errorPassword;
    }
  };

  const goToNextState = () => {
    if (state === FORGET_PASSWORD_EMAIL.state) {
      setNameButton(FORGET_PASSWORD_VERIFY_CODE.buttonName);
      setNameInput(FORGET_PASSWORD_VERIFY_CODE.inputName);
      setState(FORGET_PASSWORD_VERIFY_CODE.state);
    }
    if (state === FORGET_PASSWORD_VERIFY_CODE.state) {
      setNameButton(FORGERT_PASSWORD_CHANGE_PASSWORD.buttonName);
      setNameInput(FORGERT_PASSWORD_CHANGE_PASSWORD.inputName);
      setState(FORGERT_PASSWORD_CHANGE_PASSWORD.state);
    }
  };

  const validateEmail = () => {
    const validated = !email || email === '';
    setErrorEmail(validated);

    return !validated;
  };

  const validateVerifyCode = () => {
    const validated = !verifyCode || verifyCode === '';
    setErrorVerifyCode(validated);

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

  const samePasswords = () => password === confirmPassword;

  const validatePasswords = () => {
    validatePassword();
    validateConfirmPassword();
    if (validatePassword() && validateConfirmPassword() && !samePasswords) {
      toast.error('As senhas devem ser iguais!');
    }
    return validatePassword() && validateConfirmPassword() && samePasswords();
  };

  const sendRequest = async () => {
    if (state === FORGET_PASSWORD_EMAIL.state) {
      if (validateEmail()) {
        await forgetPassword(email, setIsLoading);
        goToNextState();
      }
    } else if (state === FORGET_PASSWORD_VERIFY_CODE.state) {
      if (validateVerifyCode()) {
        const result = await verifyCodeRequest(email, verifyCode, setIsLoading);

        if (result) {
          const { token } = result.data;
          await localStorage.setItem('letsplay_token', token);
        }
        goToNextState();
      }
    } else if (state === FORGERT_PASSWORD_CHANGE_PASSWORD.state) {
      if (validatePasswords()) {
        const result = await changePassword(password, setIsLoading);
        if (result) {
          const resultLogin = await login(email, password, setIsLoading);

          if (resultLogin) {
            const { token, user } = resultLogin.data;

            await localStorage.setItem('letsplay_token', token);

            toast(`Bem-vindo ${user.name}!`);
            window.location.replace('/home');
          }
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendRequest();
    }
  };

  return (
    <>
      <form className={style.form}>
        <CustomTextField
          onKeyDown={handleKeyDown}
          className={style.bottomSpace}
          label={nameInput}
          error={errorInput()}
          variant="outlined"
          type={typeInput()}
          value={valueInput()}
          onChange={onChangeInput()}
        />
        {state === FORGERT_PASSWORD_CHANGE_PASSWORD.state && (
          <CustomTextField
            onKeyDown={handleKeyDown}
            className={style.bottomSpace}
            label="Confirmar Senha"
            type="password"
            error={errorConfirmPassword}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <CustomButton size="large" className={style.bottomSpace} onClick={sendRequest}>
          {nameButton}
        </CustomButton>
      </form>
      <div className="login-two-buttons">
        <a className="login-buttons" onClick={goToLogin}>
          Voltar para Login
        </a>
      </div>
      <div className={style.spinner}>{isLoading && <CircularProgress color="inherit" />}</div>
    </>
  );
}

export default ForgetPassword;
