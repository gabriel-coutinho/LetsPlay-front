import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Spinner from '../spinnerLoading';
import { useStyles } from './styles';
import { getUserById } from '../../api';

export default function UserView({ idUser }) {
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(async () => {
    const result = await getUserById(idUser);

    if (result) {
      setName(result.data.name);
      setLastName(result.data.lastName);
      setEmail(result.data.email);
      setPhoneNumber(result.data.phoneNumber);
      setIsLoading(false);
    }
  }, []);

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
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
    </form>
  );
}
