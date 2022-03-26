import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PostCard from '../../components/postCard';
import { getPostById, verifyToken } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { useStyles } from './styles';
import { PostsContext } from '../home/contexts';

function Home() {
  const { idPost } = useParams();
  const history = useHistory();
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
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
    const response = await getPostById(idPost, setIsLoading);
    if (response) setPost(response?.data);
  }, []);

  const updatePosts = () => history.push('/home');

  return (
    <>
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
      <div className={style.root}>
        <PostsContext.Provider value={{ updatePosts }}>
          {post && <PostCard post={post} />}
        </PostsContext.Provider>
      </div>
    </>
  );
}

export default Home;
