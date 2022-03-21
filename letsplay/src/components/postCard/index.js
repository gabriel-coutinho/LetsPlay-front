import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatIcon from '@material-ui/icons/Chat';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getCommentsByPostId, deletePost } from '../../api';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { addressToPost } from '../../utils/addressFormat';
import { fullDatePost } from '../../utils/dateFormat';
import { PostsContext } from '../../pages/home/contexts';
import CommentCard from '../commentCard';
import CommentForm from '../commentForm';
import { useStyles } from './styles';
import { CommentsContext } from './contexts';

export default function PostCard({ post }) {
  const history = useHistory();
  const style = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { loggedUser } = useContext(LoggedUserContext);
  const { updatePostsInHome } = useContext(PostsContext);
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

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    await deletePost(post.id);
    updatePostsInHome();
  };

  const handleInfoUser = () => history.push(`/user/${owner.id}`);

  return (
    <div>
      {!isLoading && (
        <Card className={style.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={style.avatar}>
                {owner.name?.charAt(0) + owner.lastName?.charAt(0)}
              </Avatar>
            }
            action={
              myPost ? (
                <div>
                  <IconButton
                    className={style.expand}
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
            subheader={postDate}
          />
          <CardContent>
            <Typography variant="h5" component="p">
              {title}
            </Typography>
          </CardContent>
          <CardMedia className={style.media} image={sport.image.firebaseUrl} title="Sport image" />
          <CardContent>
            {post.describe && <Typography variant="body1">Descrição: {post.describe}</Typography>}
            <Typography variant="body2">Local: {address}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="request">
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleInfoUser} aria-label="info user">
              <InfoOutlinedIcon />
            </IconButton>
            <IconButton
              className={style.expand}
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
                <CommentForm postId={post.id} />
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
