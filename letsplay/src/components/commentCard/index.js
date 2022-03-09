import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getLoggedUser } from '../../api';
import { fullDateComment } from '../../utils/dateFormat';
import { useStyles } from './styles';

export default function CommentCard({ comment }) {
  const classes = useStyles();
  const [myComment, setMyComment] = useState(false);
  const { owner } = comment;
  const [loggedUser, setLoggedUser] = useState({});
  const fullNameOwner = `${owner.name.concat(` ${owner.lastName}`)}`;
  const commentDate = fullDateComment(comment.date);

  useEffect(async () => {
    const response = await getLoggedUser();
    setLoggedUser(response?.data);
    setMyComment(comment.owner.id === loggedUser.id);
  }, []);

  useEffect(() => {
    setMyComment(comment.owner.id !== loggedUser.id);
  }, [loggedUser]);

  const handleExpandClick = () => 'TODO';

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
            <IconButton
              className={classes.expand}
              onClick={handleExpandClick}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
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
