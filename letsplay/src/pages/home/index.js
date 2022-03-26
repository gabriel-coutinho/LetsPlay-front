import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import PostCard from '../../components/postCard';
import { getPostsByStatus, verifyToken } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { useStyles } from './styles';
import { PostsContext } from './contexts';

function Home() {
  const history = useHistory();
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [postsHome, setPostsHome] = useState([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);
  const [postStatus] = useState('OPEN');
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
    const response = await getPostsByStatus(postStatus, 1, setIsLoading);
    if (response) setPostsHome(response?.data.rows);
  }, [shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  const getPosts = async () => {
    const result = await getPostsByStatus(postStatus, pageNumber, setIsLoading);
    return result?.data;
  };

  const getData = async () => {
    const newPosts = await getPosts();
    setPostsHome((prevPosts) => [...prevPosts, ...newPosts.rows]);
    setHasMore(newPosts.pages > pageNumber);
    setPageNumber((prevNumber) => prevNumber + 1);
  };

  return (
    <>
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
      <div className={style.root}>
        <InfiniteScroll dataLength={postsHome.length} next={getData} hasMore={hasMore}>
          <PostsContext.Provider value={{ updatePosts }}>
            {postsHome.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostsContext.Provider>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Home;
