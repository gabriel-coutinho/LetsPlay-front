/* eslint consistent-return: off */

import React, { useState } from 'react';
import { useStyles } from './styles';

import { CustomTextField } from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';
import Spinner from '../spinnerLoading';

import '../loginForm/loginForm.css';

export default function RegisterForm() {
  const style = useStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [sport, setSport] = useState('');
  const [isLoading /* , setIsLoading */] = useState(false);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorVacancy, setErrorVacancy] = useState(false);
  const [errorSport, setErrorSport] = useState(false);

  const validatePrice = () => {
    const validated = !price || price === '';
    setErrorPrice(validated);

    return !validated;
  };

  const validateVacancy = () => {
    const validated = !vacancy || vacancy === '';
    setErrorVacancy(validated);

    return !validated;
  };

  const validateSport = () => {
    const validated = !sport || sport === '';
    setErrorSport(validated);

    return !validated;
  };

  const validateTitle = () => {
    const validated = !title || title === '';
    setErrorTitle(validated);

    return !validated;
  };

  const validateDescription = () => {
    const validated = !description || description === '';
    setErrorDescription(validated);

    return !validated;
  };

  const validatePhone = () => {
    const validated = !date || date === '';
    setErrorDate(validated);

    return !validated;
  };

  const validateInputs = () => {
    validatePrice();
    validateVacancy();
    validateSport();
    validateTitle();
    validateDescription();
    validatePhone();

    return (
      validatePrice() &&
      validateVacancy() &&
      validateSport() &&
      validateTitle() &&
      validateDescription() &&
      validatePhone()
    );
  };

  const auth = () => {
    if (!validateInputs()) {
      // error nos inputs nao preenchidos
      return false;
    }
    return true;
  };

  const registerRequest = async () => {
    auth();
    // if (auth()) {
    //   const resultRegister = await createUser(
    //     title,
    //     description,
    //     date,
    //     price,
    //     vacancy,
    //     setIsLoading
    //   );
    //   if (resultRegister) {
    //     const resultLogin = await login(price, password, setIsLoading);
    //     if (resultLogin) {
    //       const { token, user } = resultLogin.data;
    //       await localStorage.setItem('letsplay_token', token);
    //       toast(`Bem-vindo ${user.name}!`);
    //       window.location.replace('/home');
    //     }
    //   }
    // }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      registerRequest();
    }
  };

  return (
    <>
      <form className={style.form}>
        Criar Post
        <div className={`${style.twoFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.shortField}
            label="Título*"
            error={errorTitle}
            variant="outlined"
            value={title}
            onKeyDown={handleKeyDown}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CustomTextField
            className={style.shortField}
            label="Descrição*"
            error={errorDescription}
            variant="outlined"
            value={description}
            onKeyDown={handleKeyDown}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <CustomTextField
          className={style.bottomSpace}
          label="Price"
          error={errorPrice}
          variant="outlined"
          value={price}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPrice(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Data do evento*"
          error={errorDate}
          variant="outlined"
          value={date}
          onKeyDown={handleKeyDown}
          onChange={(e) => setDate(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Vagas*"
          error={errorVacancy}
          variant="outlined"
          value={vacancy}
          onKeyDown={handleKeyDown}
          onChange={(e) => setVacancy(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Esporte*"
          error={errorSport}
          variant="outlined"
          value={sport}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSport(e.target.value)}
        />
        <CustomButton size="large" className={style.bottomSpace} onClick={registerRequest}>
          CRIAR POST
        </CustomButton>
        <div className="spinner">{isLoading && <Spinner />}</div>
      </form>
    </>
  );
}
