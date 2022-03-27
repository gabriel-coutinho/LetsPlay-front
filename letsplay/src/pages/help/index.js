import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { verifyToken } from '../../api';

export default function Help() {
  const history = useHistory();
  const style = useStyles();
  const [token] = useState(localStorage.getItem('letsplay_token'));

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (!result) history.push('/');
    } else {
      history.push('/');
    }
  }, [token]);

  return (
    <div className={style.root}>
      <Typography paragraph variant="h4">
        LetsPlay App
      </Typography>
      <Typography>
        Está aplicação tem como intuito principal ser o elo entre pessoas que desejam praticar
        esportes coletivos, sejam físicos ou eletrônicos.
      </Typography>
      <Typography>
        Aqui você pode criar eventos(Posts) com data e local marcado e encontrar outros usuários
        interessados.
      </Typography>
      <Typography>
        Você também pode pedir para participar de um evento criado por outra pessoa, é só se
        candidatar e esperar ser aprovado pelo criador.
      </Typography>
      <Typography paragraph>
        Qualquer dúvida ou sugestão estou a disposição, pode entrar em contato através do email{' '}
        <b>suporte.letsplayapp@gmail.com</b>
      </Typography>
      <Typography>
        <b>Gabriel Coutinho</b>
      </Typography>
    </div>
  );
}
