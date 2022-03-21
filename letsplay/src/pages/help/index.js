import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

export default function Help() {
  const style = useStyles();
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
