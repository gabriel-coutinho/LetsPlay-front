import React, { useEffect, useState, useContext } from 'react';
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
import { getCommentsByPostId } from '../../api';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { addressToPost } from '../../utils/addressFormat';
import { fullDatePost } from '../../utils/dateFormat';
import CommentCard from '../commentCard';
import { useStyles } from './styles';
import { CommentsContext } from './contexts';

export default function PostCard({ post }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [commentIcon, setCommentIcon] = useState(<ChatIcon />);
  const { sport } = post;
  const { owner } = post;
  const title = `${post.title} - ${sport.name}`;
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsCounter, setCommentsCounter] = useState(post.comments.length);
  const [shouldUpdateComments, setShouldUpdateComments] = useState(false);
  const fullNameOwner = `${owner.name.concat(` ${owner.lastName}`)}`;
  const postDate = fullDatePost(post.date);

  const updateCommentsInPost = () => {
    setShouldUpdateComments(!shouldUpdateComments);
  };

  useEffect(async () => {
    setAddress(addressToPost(post.address));
  }, []);

  useEffect(async () => {
    const response = await getCommentsByPostId(post.id, setIsLoading);
    setComments(response?.data);
    setCommentsCounter(response.data.length);
  }, [shouldUpdateComments]);

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
    <div>
      {!isLoading && (
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
          <CardMedia
            className={classes.media}
            image={sport.image.firebaseUrl}
            title="Sport image"
          />
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
              <Typography variant="subtitle1">{commentsCounter}</Typography>
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CommentsContext.Provider value={{ updateCommentsInPost }}>
              <CardContent>
                {comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </CardContent>
            </CommentsContext.Provider>
          </Collapse>
        </Card>
      )}
    </div>
  );
}
