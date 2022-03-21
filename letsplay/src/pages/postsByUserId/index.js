import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/postCard';
import { getPostsByUserId } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { useStyles } from './styles';
import { PostsContext } from '../home/contexts';

export default function PostsByUserId() {
  const { idUser } = useParams();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);
  const [posts, setPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);

  useEffect(async () => {
    const response = await getPostsByUserId(idUser, setIsLoading);
    if (response) setPosts(response?.data);
  }, [loggedUser, shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  return (
    <>
      <div className={classes.spinner}>{isLoading && <Spinner />}</div>
      <PostsContext.Provider value={{ updatePosts }}>
        <div className={classes.root}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </PostsContext.Provider>
    </>
  );
}
