import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Spinner from '../spinnerLoading';
import { useStyles } from './styles';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { CustomButton } from '../styles/button.style';

export default function UserView() {
  const history = useHistory();
  const style = useStyles();
  const { loggedUser } = useContext(LoggedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setName(loggedUser.name);
    setLastName(loggedUser.lastName);
    setEmail(loggedUser.email);
    setPhoneNumber(loggedUser.phoneNumber);

    if (Object.keys(loggedUser).length !== 0) {
      setIsLoading(false);
    }
  }, [loggedUser]);

  const goToEditUser = () => {
    history.push('/me/edit');
  };

  const goToChangePassword = () => {
    history.push('/me/changePassword');
  };

  return (
    <form className={style.root}>
      <Typography paragraph variant="h4">
        Informações do usuário
      </Typography>
      <Typography>
        <b>Nome:</b> {name}
      </Typography>
      <Typography>
        <b>Sobrenome:</b> {lastName}
      </Typography>
      <Typography>
        <b>Email:</b> {email}
      </Typography>
      <Typography paragraph>
        <b>Telefone:</b> {phoneNumber}
      </Typography>
      <div className={style.multiFields}>
        <CustomButton size="small" className={style.twoField} onClick={goToEditUser}>
          Editar Perfil
        </CustomButton>
        <CustomButton size="small" className={style.twoField} onClick={goToChangePassword}>
          Mudar Senha
        </CustomButton>
      </div>
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
    </form>
  );
}
