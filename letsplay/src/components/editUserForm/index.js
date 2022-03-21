import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStyles } from './styles';
import Spinner from '../spinnerLoading';
import { CustomTextField } from '../styles/inputs.style';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { CustomButton } from '../styles/button.style';
import { updateUser } from '../../api';

export default function EditUserForm() {
  const history = useHistory();
  const style = useStyles();
  const { loggedUser } = useContext(LoggedUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(loggedUser.name);
  const [lastName, setLastName] = useState(loggedUser.lastName);
  const [email, setEmail] = useState(loggedUser.email);
  const [phoneNumber, setPhoneNumber] = useState(loggedUser.phoneNumber);

  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumnber] = useState(false);

  const validateName = () => {
    const validated = !name || name.trim() === '';
    setErrorName(validated);

    return !validated;
  };

  const validateLastName = () => {
    const validated = !lastName || lastName.trim() === '';
    setErrorLastName(validated);

    return !validated;
  };

  const validateEmail = () => {
    const validated = !email || email.trim() === '';
    setErrorEmail(validated);

    return !validated;
  };
  const validatePhoneNumber = () => {
    const validated = !phoneNumber || phoneNumber.trim() === '';
    setErrorPhoneNumnber(validated);

    return !validated;
  };

  const validateInputs = () => {
    validateName();
    validateLastName();
    validateEmail();
    validatePhoneNumber();

    return validateName() && validateLastName() && validateEmail() && validatePhoneNumber();
  };

  const hasChanges = () =>
    name !== loggedUser.name ||
    lastName !== loggedUser.lastName ||
    email !== loggedUser.email ||
    phoneNumber !== loggedUser.phoneNumber;

  const saveEdit = async () => {
    if (validateInputs()) {
      if (hasChanges()) {
        const result = await updateUser(
          loggedUser.id,
          name,
          lastName,
          email,
          phoneNumber,
          setIsLoading
        );

        if (result) {
          toast.success('Usuário atualizado com sucesso!');
          window.location.replace('/me');
        }
      } else {
        toast.success('Usuário atualizado com sucesso!');
        history.push('/me');
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveEdit();
    }
  };

  return (
    <>
      <form className={style.form}>
        <CustomTextField
          className={style.bottomSpace}
          label="Nome*"
          type="text"
          defaultValue={loggedUser.name}
          error={errorName}
          variant="outlined"
          value={name}
          onKeyDown={handleKeyDown}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Sobrenome*"
          type="text"
          defaultValue={loggedUser.lastName}
          error={errorLastName}
          variant="outlined"
          value={lastName}
          onKeyDown={handleKeyDown}
          onChange={(e) => setLastName(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Email*"
          type="email"
          defaultValue={loggedUser.email}
          error={errorEmail}
          variant="outlined"
          value={email}
          onKeyDown={handleKeyDown}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          className={style.bottomSpace}
          label="Telefone*"
          type="tel"
          defaultValue="888"
          error={errorPhoneNumber}
          variant="outlined"
          value={phoneNumber}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <CustomButton size="medium" className={style.bottomSpace} onClick={saveEdit}>
          Salvar Alterações
        </CustomButton>
        <div className={style.spinner}>{isLoading && <Spinner />}</div>
      </form>
    </>
  );
}
