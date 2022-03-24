import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from './styles';
import Spinner from '../spinnerLoading';
import {
  CustomTextField,
  CustomFormControlField,
  CustomInputLabelField,
  CustomSelectField,
} from '../styles/inputs.style';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { CustomButton, CancelButton } from '../styles/button.style';
import { updateUser } from '../../api';

export default function EditUserForm() {
  const history = useHistory();
  const style = useStyles();
  const { loggedUser } = useContext(LoggedUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(loggedUser.name);
  const [lastName, setLastName] = useState(loggedUser.lastName);
  const [gender, setGender] = useState(loggedUser.gender);
  const [email, setEmail] = useState(loggedUser.email);
  const [phoneNumber, setPhoneNumber] = useState(loggedUser.phoneNumber);

  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

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

  const validateGender = () => {
    const validated = !gender || gender === '';
    setErrorGender(validated);

    return !validated;
  };

  const validateEmail = () => {
    const validated = !email || email.trim() === '';
    setErrorEmail(validated);

    return !validated;
  };
  const validatePhoneNumber = () => {
    const validated = !phoneNumber || phoneNumber.trim() === '';
    setErrorPhoneNumber(validated);

    return !validated;
  };

  const validateInputs = () => {
    validateName();
    validateLastName();
    validateGender();
    validatePhoneNumber();
    validateEmail();

    return (
      validateName() &&
      validateLastName() &&
      validateGender() &&
      validatePhoneNumber() &&
      validateEmail()
    );
  };

  const hasChanges = () =>
    name !== loggedUser.name ||
    lastName !== loggedUser.lastName ||
    gender !== loggedUser.gender ||
    phoneNumber !== loggedUser.phoneNumber ||
    email !== loggedUser.email;

  const saveEdit = async () => {
    if (validateInputs()) {
      if (hasChanges()) {
        const result = await updateUser(
          loggedUser.id,
          name,
          lastName,
          gender,
          phoneNumber,
          email,
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

  const handleCancel = () => history.push('/me');

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
        <CustomFormControlField
          error={errorGender}
          variant="outlined"
          className={style.bottomSpace}
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
        <div className={style.multiFields}>
          <CustomButton size="medium" className={style.twoField} onClick={saveEdit}>
            Salvar Alterações
          </CustomButton>
          <CancelButton
            size="medium"
            className={`${style.twoField} ${style.cancelButton}`}
            onClick={handleCancel}
          >
            Cancelar
          </CancelButton>
        </div>
        <div className={style.spinner}>{isLoading && <Spinner />}</div>
      </form>
    </>
  );
}
