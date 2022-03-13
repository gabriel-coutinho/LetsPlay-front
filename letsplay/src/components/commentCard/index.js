import React, { useEffect, useState, useContext } from 'react';
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
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { CommentsContext } from '../postCard/contexts';
import { deleteComment } from '../../api';
import { fullDateComment } from '../../utils/dateFormat';
import { useStyles } from './styles';

export default function CommentCard({ comment }) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [myComment, setMyComment] = useState(false);
  const { updateCommentsInPost } = useContext(CommentsContext);
  const { owner } = comment;
  const { loggedUser } = useContext(LoggedUserContext);
  const fullNameOwner = `${owner.name.concat(` ${owner.lastName}`)}`;
  const commentDate = fullDateComment(comment.createdAt);

  useEffect(() => {
    setMyComment(comment.owner.id === loggedUser.id);
  }, [loggedUser]);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    history.push('/home');
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    await deleteComment(comment.id);
    updateCommentsInPost();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {owner.name?.charAt(0) + owner.lastName?.charAt(0)}
          </Avatar>
        }
        action={
          myComment ? (
            <div>
              <IconButton
                className={classes.expand}
                onClick={handleMoreClick}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>Editar</MenuItem>
                <MenuItem onClick={handleDelete}>Excluir</MenuItem>
              </Menu>
            </div>
          ) : (
            <></>
          )
        }
        title={fullNameOwner}
        subheader={commentDate}
      />
      <CardContent>
        <Typography paragraph>{comment.content}</Typography>
      </CardContent>
    </Card>
  );
}
