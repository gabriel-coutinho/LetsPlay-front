import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ChatIcon from '@material-ui/icons/Chat';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getLoggedUser } from '../../api';
import { addressToPost } from '../../utils/addressFormat';
import { fullDatePost } from '../../utils/dateFormat';
import CommentCard from '../commentCard';
import { useStyles } from './styles';

export default function PostCard({ post }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [commentIcon, setCommentIcon] = useState(<ChatIcon />);
  const { sport } = post;
  const { owner } = post;
  const title = `${post.title} - ${sport.name}`;
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState([]);
  const fullNameOwner = `${owner.name.concat(` ${owner.lastName}`)}`;
  const postDate = fullDatePost(post.date);

  useEffect(async () => {
    const response = await getLoggedUser();
    setLoggedUser(response?.data);
    setAddress(addressToPost(post.address));
    setComments(post.comments);
  }, []);

  useEffect(() => {
    setMyPost(post.owner.id === loggedUser.id);
  }, [loggedUser]);

  useEffect(() => {
    setCommentIcon(expanded ? <ChatIcon /> : <ChatOutlinedIcon />);
  }, [expanded]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          myPost ? (
            <IconButton
              className={classes.expand}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
          ) : (
            <></>
          )
        }
        title={fullNameOwner}
        subheader={postDate}
      />
      <CardContent>
        <Typography variant="h5" component="p">
          {title}
        </Typography>
      </CardContent>
      <CardMedia className={classes.media} image={sport.image.firebaseUrl} title="Sport image" />
      <CardContent>
        <Typography variant="body2">Local do Evento:</Typography>
        <Typography variant="body2" className={classes.colorSecondary}>
          {address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {commentIcon}
          {'\u00A0'}
          <Typography variant="subtitle1">{comments.length}</Typography>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map((comment) => (
            <CommentCard comment={comment} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
