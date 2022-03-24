import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Spinner from '../spinnerLoading';
import { useStyles } from './styles';
import { getUserById } from '../../api';
import { CustomButton } from '../styles/button.style';

export default function UserView({ idUser }) {
  const history = useHistory();
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(async () => {
    const result = await getUserById(idUser);

    if (result) {
      setName(result.data.name);
      setLastName(result.data.lastName);
      setGender(result.data.gender);
      setEmail(result.data.email);
      setPhoneNumber(result.data.phoneNumber);
      setIsLoading(false);
    }
  }, []);

  const goToPostsByUserId = () => history.push(`/user/${idUser}/posts`);

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
        <b>Gênero:</b> {gender}
      </Typography>
      <Typography>
        <b>Email:</b> {email}
      </Typography>
      <Typography paragraph>
        <b>Telefone:</b> {phoneNumber}
      </Typography>
      <CustomButton size="medium" onClick={goToPostsByUserId}>
        Ver Posts
      </CustomButton>
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
    </form>
  );
}
