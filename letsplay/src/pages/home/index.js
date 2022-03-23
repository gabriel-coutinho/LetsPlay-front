import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PostCard from '../../components/postCard';
import { getPostsByStatus, verifyToken } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { useStyles } from './styles';
import { PostsContext } from './contexts';

function Home() {
  const history = useHistory();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [postsHome, setPostsHome] = useState([]);
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
    const response = await getPostsByStatus(postStatus, setIsLoading);
    setPostsHome(response?.data);
  }, [postStatus, shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  return (
    <>
      <div className={classes.spinner}>{isLoading && <Spinner />}</div>
      <PostsContext.Provider value={{ updatePosts }}>
        <div className={classes.root}>
          {postsHome.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </PostsContext.Provider>
    </>
  );
}

export default Home;
