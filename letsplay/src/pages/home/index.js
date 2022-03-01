import React, { useEffect, useState } from 'react';
import PostCard from '../../components/postCard';
import { getPostByStatus } from '../../api';
import Spinner from '../../components/spinnerLoading';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [postsHome, setPostsHome] = useState([]);
  const [postStatus] = useState('OPEN');

  useEffect(async () => {
    const response = await getPostByStatus(postStatus, setIsLoading);
    setPostsHome(response?.data);
  }, [postStatus]);

  return (
    <>
      {isLoading && <Spinner />}
      {postsHome.map((post) => (
        <PostCard post={post} />
      ))}
    </>
  );
}

export default Home;
