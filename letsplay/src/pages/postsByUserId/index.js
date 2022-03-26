import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from '../../components/postCard';
import { getPostsByUserId, verifyToken } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { useStyles } from './styles';
import { PostsContext } from '../home/contexts';

export default function PostsByUserId() {
  const history = useHistory();
  const { idUser } = useParams();
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);
  const [posts, setPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);
  const [token] = useState(localStorage.getItem('letsplay_token'));

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (!result) history.push('/');
    } else {
      history.push('/');
    }
  }, [token]);

  useEffect(async () => {
    const response = await getPostsByUserId(idUser, 1, setIsLoading);
    if (response) setPosts(response?.data.rows);
  }, [loggedUser, shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  const getPostsUser = async () => {
    const result = await getPostsByUserId(idUser, pageNumber, setIsLoading);
    return result?.data;
  };

  const getData = async () => {
    const newPosts = await getPostsUser();
    setPosts((prevPosts) => [...prevPosts, ...newPosts.rows]);
    setHasMore(newPosts.pages > pageNumber);
    setPageNumber((prevNumber) => prevNumber + 1);
  };

  return (
    <>
      <div className={classes.spinner}>{isLoading && <Spinner />}</div>
      <div className={classes.root}>
        <InfiniteScroll dataLength={posts.length} next={getData} hasMore={hasMore}>
          <PostsContext.Provider value={{ updatePosts }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostsContext.Provider>
        </InfiniteScroll>
      </div>
    </>
  );
}
