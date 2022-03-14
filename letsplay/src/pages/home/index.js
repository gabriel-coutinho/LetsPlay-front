import React, { useEffect, useState } from 'react';
import PostCard from '../../components/postCard';
import { getPostByStatus } from '../../api';
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
    const response = await getPostByStatus(postStatus, setIsLoading);
    setPostsHome(response?.data);
  }, [postStatus, shouldUpdatePosts]);

  const updatePostsInHome = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  return (
    <PostsContext.Provider value={{ updatePostsInHome }}>
      <div className={classes.root}>
        {isLoading && <Spinner />}
        {postsHome.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PostsContext.Provider>
  );
}

export default Home;
