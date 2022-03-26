import React, { useState } from 'react';
// import { toast } from 'react-toastify';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { LoggedUserContext } from '../../utils/loggedUserProvider';
// import { CommentsContext } from '../postCard/contexts';
// import { deleteComment } from '../../api';
// import { fullDateComment } from '../../utils/dateFormat';
import { useStyles } from './styles';

export default function MyRequestCard() {
  const style = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [myComment, setMyComment] = useState(false);
  // const { updateCommentsInPost } = useContext(CommentsContext);
  // const { owner } = comment;
  // const { loggedUser } = useContext(LoggedUserContext);
  // const fullNameOwner = `${owner.name.concat(` ${owner.lastName}`)}`;
  // const commentDate = fullDateComment(comment.createdAt);

  // useEffect(() => {
  //   setMyComment(comment.owner.id === loggedUser.id);
  // }, [loggedUser]);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    // await deleteComment(comment.id);
    // toast.success('Comentário excluido com sucesso!');
    // updateCommentsInPost();
  };

  const TODO = () => setAnchorEl(null);

  return (
    <Card className={style.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={style.avatar}>
            TE
            {/* {owner.name?.charAt(0) + owner.lastName?.charAt(0)} */}
          </Avatar>
        }
        action={
          // myComment ? (
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
          // ) : (
          //     <></>
          //   )
        }
        title="teste" // {fullNameOwner}
        subheader="teste" // {commentDate}
      />
      <CardContent>
        <Typography paragraph>teste</Typography>
      </CardContent>
      <IconButton className={style.expand} onClick={TODO} aria-label="accept">
        <CheckCircleOutlineIcon fontSize="large" />
      </IconButton>
      <IconButton className={style.expand} onClick={TODO} aria-label="reject">
        <CancelOutlinedIcon fontSize="large" />
      </IconButton>
    </Card>
  );
}
