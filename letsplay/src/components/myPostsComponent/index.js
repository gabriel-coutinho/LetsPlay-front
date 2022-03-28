import React, { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import PostCard from '../postCard';
import { getMyPosts, verifyToken } from '../../api';
import Spinner from '../spinnerLoading';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { useStyles } from './styles';
import { PostsContext } from '../../pages/home/contexts';

export default function MyPostsComponent() {
  const history = useHistory();
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const { loggedUser } = useContext(LoggedUserContext);
  const [myPosts, setMyPosts] = useState([]);
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
    const response = await getMyPosts(1, setIsLoading);
    if (response) setMyPosts(response?.data.rows);
  }, [loggedUser, shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  const getPosts = async () => {
    const result = await getMyPosts(pageNumber, setIsLoading);
    return result?.data;
  };

  const getData = async () => {
    const newPosts = await getPosts();
    setMyPosts((prevPosts) => [...prevPosts, ...newPosts.rows]);
    setHasMore(newPosts.pages > pageNumber);
    setPageNumber((prevNumber) => prevNumber + 1);
  };

  return (
    <>
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
      <div className={style.root}>
        <InfiniteScroll dataLength={myPosts.length} next={getData} hasMore={hasMore}>
          <PostsContext.Provider value={{ updatePosts }}>
            {myPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostsContext.Provider>
        </InfiniteScroll>
      </div>
    </>
  );
}
