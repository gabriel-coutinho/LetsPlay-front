import React, { useEffect, useState, useContext } from 'react';
import PostCard from '../../components/postCard';
import { getMyPosts } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { useStyles } from './styles';
import { PostsContext } from '../home/contexts';
// import { PostsContext } from './contexts';

function MyPosts() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);
  // const [postStatus] = useState('OPEN');

  useEffect(async () => {
    const response = await getMyPosts(setIsLoading);
    if (response) setMyPosts(response?.data);
  }, [loggedUser, shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  return (
    <>
      <div className={classes.spinner}>{isLoading && <Spinner />}</div>
      <PostsContext.Provider value={{ updatePosts }}>
        <div className={classes.root}>
          {myPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </PostsContext.Provider>
    </>
  );
}

export default MyPosts;
