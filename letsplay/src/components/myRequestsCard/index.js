import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { RequestsContext } from '../myRequestsList/contexts';
import { deleteRequest } from '../../api';
import { fullDateComment } from '../../utils/dateFormat';
import { useStyles } from './styles';

export default function MyRequestCard({ request }) {
  const style = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { updateRequests } = useContext(RequestsContext);
  const { loggedUser } = useContext(LoggedUserContext);
  const requestDate = fullDateComment(request.date);
  const title = `${request.post.title} - ${request.post.sport.name}`;
  const fullNameOwner = `${loggedUser.name.concat(` ${loggedUser.lastName}`)}`;
  const [labelByStatus, setLabelByStatus] = useState('');
  const [iconByStatus, setIconByStatus] = useState();

  useEffect(() => {
    const { status } = request;
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

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    await deleteRequest(request.id);
    toast.success('Requisi????o excluida com sucesso!');
    updateRequests();
  };

  const goToPostById = () => {
    history.push(`/post/${request.post.id}`);
  };

  return (
    <Card className={style.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={style.avatar}>
            {loggedUser.name?.charAt(0) + loggedUser.lastName?.charAt(0)}
          </Avatar>
        }
        action={
          <div>
            <IconButton className={style.expand} onClick={handleMoreClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDelete}>Excluir</MenuItem>
            </Menu>
          </div>
        }
        title={fullNameOwner}
        subheader={`Expira em: ${requestDate}`}
      />
      <CardContent>
        <Typography paragraph className={style.labelIcon}>
          {iconByStatus}
          {labelByStatus}
        </Typography>
        <a className={style.a} onClick={goToPostById}>
          {title}
        </a>
      </CardContent>
    </Card>
  );
}
