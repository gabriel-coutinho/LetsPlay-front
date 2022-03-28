import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { PostRequestsContext } from '../requestsMyPostsList/contexts';
import { updateRequest } from '../../api';
import { fullDateComment } from '../../utils/dateFormat';
import { useStyles } from './styles';

export default function RequestMyPostsCard({ request }) {
  const style = useStyles();
  const history = useHistory();
  const { updatePosts } = useContext(PostRequestsContext);
  const requestDate = fullDateComment(request.date);
  const fullNameOwner = `${request.user.name.concat(` ${request.user.lastName}`)}`;
  const [labelByStatus, setLabelByStatus] = useState('');
  const [status, setStatus] = useState(request.status);
  const [iconByStatus, setIconByStatus] = useState();

  useEffect(() => {
    if (status) {
      if (status === 'OPEN') {
        setLabelByStatus('AGUARDANDO RESPOSTA');
        setIconByStatus(<MoreHorizIcon />);
      } else if (status === 'ACCEPTED') {
        setLabelByStatus('ACEITA');
        setIconByStatus(<DoneIcon />);
      } else if (status === 'REJECTED') {
        setLabelByStatus('REJEITADA');
        setIconByStatus(<ClearIcon />);
      }
    }
  }, [request]);

  const goToUserById = () => {
    history.push(`/user/${request.user.id}`);
  };

  const handleAccept = async () => {
    const statusAccepted = 'ACCEPTED';
    const result = await updateRequest(request.id, statusAccepted);
    if (result) {
      setStatus(result.data?.status);
      updatePosts();
      toast.success('Requisição aceita!');
    }
  };

  const handleReject = async () => {
    const statusRejected = 'REJECTED';
    const result = await updateRequest(request.id, statusRejected);
    if (result) {
      setStatus(result.data?.status);
      updatePosts();
      toast.success('Requisição rejeitada!');
    }
  };

  return (
    <Card className={style.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={style.avatar}>
            {request.user.name?.charAt(0) + request.user.lastName?.charAt(0)}
          </Avatar>
        }
        title={
          <a className={style.a} onClick={goToUserById}>
            <b>{fullNameOwner}</b>
          </a>
        }
        subheader={`Expira em: ${requestDate}`}
      />
      <CardContent>
        <Typography paragraph className={style.labelIcon}>
          {iconByStatus}
          {labelByStatus}
        </Typography>
      </CardContent>
      <IconButton className={style.expand} onClick={handleAccept} aria-label="accept">
        <CheckCircleOutlineIcon fontSize="large" />
      </IconButton>
      <IconButton className={style.expand} onClick={handleReject} aria-label="reject">
        <CancelOutlinedIcon fontSize="large" />
      </IconButton>
    </Card>
  );
}
