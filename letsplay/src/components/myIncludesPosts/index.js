import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PostCard from '../postCard';
import { verifyToken } from '../../api';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { useStyles } from './styles';
import { PostsContext } from '../../pages/home/contexts';

export default function MyIncludesPosts() {
  const history = useHistory();
  const style = useStyles();
  const { loggedUser } = useContext(LoggedUserContext);
  const [myIncludesPosts, setMyIncludesPosts] = useState([]);
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

  useEffect(() => {
    if (loggedUser.posts) setMyIncludesPosts(loggedUser.posts);
  }, [loggedUser, shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  return (
    <>
      <div className={style.root}>
        <PostsContext.Provider value={{ updatePosts }}>
          {myIncludesPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </PostsContext.Provider>
      </div>
    </>
  );
}
