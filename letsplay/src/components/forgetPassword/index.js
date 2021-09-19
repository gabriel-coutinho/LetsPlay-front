import React, { useState } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { CustomTextField } from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';

import {
  FORGET_PASSWORD_EMAIL,
  FORGET_PASSWORD_VERIFY_CODE,
  FORGERT_PASSWORD_CHANGE_PASSWORD,
} from '../../utils/contants';
import { forgetPassword, verifyCodeRequest, changePassword } from '../../api';

const useStyles = makeStyles({
  bottomSpace: {
    marginBottom: '30px',
  },
  center: {
    alignSelf: 'center',
  },
});

function ForgetPassword({ flip }) {
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
    flip(false);
  };

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
        await changePassword(password, setIsLoading);
        goToNextState();
      }
    }
  };

  return (
    <>
      <form style={{ marginTop: '60px', flexDirection: 'column', display: 'flex', width: '100%' }}>
        <CustomTextField
          className={style.bottomSpace}
          label={nameInput}
          error={errorInput()}
          variant="outlined"
          value={valueInput()}
          onChange={onChangeInput()}
        />
        {state === FORGERT_PASSWORD_CHANGE_PASSWORD.state && (
          <CustomTextField
            className={style.bottomSpace}
            label="Confirmar Senha"
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
        <a
          className="login-forget-password"
          style={{ fontWeight: 'bold', color: 'rgb(4, 81, 105)' }}
          onClick={goToLogin}
        >
          Voltar para Login
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
    </>
  );
}

export default ForgetPassword;
