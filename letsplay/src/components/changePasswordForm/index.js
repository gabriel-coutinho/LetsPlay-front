import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../spinnerLoading';
import { useStyles } from './styles';
import { CustomTextField } from '../styles/inputs.style';
import { CustomButton, CancelButton } from '../styles/button.style';
import { changePassword } from '../../api';

export default function ChangePasswordForm() {
  const history = useHistory();
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const validatePassword = () => {
    const validated = !password || password.trim() === '';
    setErrorPassword(validated);

    return !validated;
  };

  const samePasswords = () => password === confirmPassword;

  const validateConfirmPassword = () => {
    const validated = !confirmPassword || confirmPassword.trim() === '';
    setErrorConfirmPassword(validated);

    return !validated;
  };

  const validateInputs = () => {
    validatePassword();
    validateConfirmPassword();

    if (validatePassword() && validateConfirmPassword() && !samePasswords()) {
      toast.error('As senhas devem ser iguais!');
    }
    return validatePassword() && validateConfirmPassword() && samePasswords();
  };

  const saveEdit = async () => {
    if (validateInputs()) {
      const result = await changePassword(password, setIsLoading);

      if (result) {
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
        <div className={`${style.multiFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.twoField}
            label="Senha*"
            type="password"
            error={errorPassword}
            variant="outlined"
            value={password}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomTextField
            className={style.twoField}
            label="Confirmar Senha*"
            type="password"
            error={errorConfirmPassword}
            variant="outlined"
            value={confirmPassword}
            onKeyDown={handleKeyDown}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={style.multiFields}>
          <CustomButton size="medium" className={style.twoField} onClick={saveEdit}>
            Salvar Alterações
          </CustomButton>
          <CancelButton size="medium" className={style.twoField} onClick={handleCancel}>
            Cancelar
          </CancelButton>
        </div>
        <div className={style.spinner}>{isLoading && <Spinner />}</div>
      </form>
    </>
  );
}
