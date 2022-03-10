import React, { useEffect, useState } from 'react';
import PostCard from '../../components/postCard';
import { getPostByStatus } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { useStyles } from './styles';

function Home() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [postsHome, setPostsHome] = useState([]);
  const [postStatus] = useState('OPEN');

  useEffect(async () => {
    const response = await getPostByStatus(postStatus, setIsLoading);
    setPostsHome(response?.data);
  }, [postStatus]);

  return (
    <>
      <div className={classes.root}>
        {isLoading && <Spinner />}
        {postsHome.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default Home;
