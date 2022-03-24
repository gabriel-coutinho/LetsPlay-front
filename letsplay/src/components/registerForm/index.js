/* eslint consistent-return: off */

import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from './styles';
import {
  CustomTextField,
  CustomSelectField,
  CustomInputLabelField,
  CustomFormControlField,
} from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';
import { login, createUser } from '../../api';
import Spinner from '../spinnerLoading';

import '../loginForm/loginForm.css';

export default function RegisterForm() {
  const style = useStyles();
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
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

  const validateGender = () => {
    const validated = !gender || gender === '';
    setErrorGender(validated);

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
    validateGender();
    validatePhone();

    return (
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateName() &&
      validateLastName() &&
      validateGender() &&
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
      toast.error('As senhas devem ser iguais!');
      return false;
    }

    return true;
  };

  const registerRequest = async () => {
    if (auth()) {
      const resultRegister = await createUser(
        name,
        lastName,
        gender,
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
      <form className={style.form}>
        <div className={`${style.twoFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.shortField}
            label="Nome*"
            error={errorName}
            variant="outlined"
            value={name}
            onKeyDown={handleKeyDown}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomTextField
            className={style.shortField}
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
        <div className={`${style.twoFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.shortField}
            label="Telefone*"
            error={errorPhoneNumber}
            variant="outlined"
            value={phoneNumber}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <CustomFormControlField
            error={errorGender}
            variant="outlined"
            className={style.shortField}
          >
            <CustomInputLabelField variant="outlined">Gênero</CustomInputLabelField>
            <CustomSelectField
              variant="outlined"
              label="Gênero"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </CustomSelectField>
          </CustomFormControlField>
        </div>
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
          <a className="login-buttons" onClick={goToLogin}>
            Já possui login? Entrar
          </a>
        </div>
        <div className={style.spinner}>{isLoading && <Spinner />}</div>
      </form>
    </>
  );
}
