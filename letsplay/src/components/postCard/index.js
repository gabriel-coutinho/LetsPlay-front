import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
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
import ClearIcon from '@material-ui/icons/Clear';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatIcon from '@material-ui/icons/Chat';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  getCommentsByPostId,
  deletePost,
  createRequest,
  deleteRequest,
  existedOpenRequest,
} from '../../api';
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
  const [expired, setExpired] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [hasOpenRequest, setHasOpenRequest] = useState();
  const [checkExistedOpenRequest, setCheckExistedOpenRequest] = useState(true);
  const [addRemoveIcon, setAddRemoveIcon] = useState();
  const [idsUsersInPost, serIdsUsersInPost] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { loggedUser } = useContext(LoggedUserContext);
  const { updatePosts } = useContext(PostsContext);
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
    const now = new Date();
    const datePost = new Date(post.date);
    if (post.status === 'EXPIRED' || datePost < now) {
      setExpired(true);
    }
    serIdsUsersInPost(post.users.map((user) => user.id));
    setIsFull(post.status === 'FULL');
    setAddress(addressToPost(post.address));
  }, []);

  useEffect(async () => {
    const resultExistedOpenRequest = await existedOpenRequest(post.id);
    if (!resultExistedOpenRequest) {
      setHasOpenRequest(resultExistedOpenRequest);
      setAddRemoveIcon(<AddIcon />);
    } else {
      setHasOpenRequest(resultExistedOpenRequest.data);
      setAddRemoveIcon(<ClearIcon />);
    }
  }, [checkExistedOpenRequest]);

  useEffect(async () => {
    const response = await getCommentsByPostId(post.id, setIsLoading);
    setComments(response?.data);
    setCommentsCounter(response.data.length);
  }, [shouldUpdateComments]);

  useEffect(() => {
    setMyPost(post.owner.id === loggedUser.id || idsUsersInPost.includes(loggedUser.id));
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
    history.push(`/editPost/${post.id}`);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    await deletePost(post.id);
    updatePosts();
  };

  const handleInfoUser = () => {
    if (post.owner.id !== loggedUser.id) {
      history.push(`/user/${owner.id}`);
    } else {
      history.push(`/post/${post.id}`);
    }
  };

  const handleCreateDeleteRequest = async () => {
    if (hasOpenRequest) {
      await deleteRequest(hasOpenRequest.id);
      toast.success('Requisição excluida com sucesso!');
      setCheckExistedOpenRequest((prev) => !prev);
    } else {
      const newRequest = await createRequest(post.id);
      if (newRequest) {
        toast.success('Requisição criada com sucesso!');
        setCheckExistedOpenRequest((prev) => !prev);
      }
    }
  };

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
            {post.price ? (
              <Typography variant="body1">Preço: R$ {post.price}</Typography>
            ) : (
              <Typography variant="body1">Preço: GRÁTIS</Typography>
            )}
            <Typography variant="body1">
              Vagas ocupadas: {post.usersCount}/{post.vacancy}
            </Typography>
            <Typography variant="body2">Local: {address}</Typography>
            {expired && (
              <Typography variant="body2">
                <b>EXPIRADO!</b>
              </Typography>
            )}
          </CardContent>
          <CardActions disableSpacing>
            {!myPost && !isFull && (
              <IconButton onClick={handleCreateDeleteRequest} aria-label="request">
                {addRemoveIcon}
              </IconButton>
            )}
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
