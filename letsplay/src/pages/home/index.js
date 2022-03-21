import React, { useEffect, useState } from 'react';
import PostCard from '../../components/postCard';
import { getPostsByStatus } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { useStyles } from './styles';
import { PostsContext } from './contexts';

function Home() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [postsHome, setPostsHome] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);
  const [postStatus] = useState('OPEN');

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
