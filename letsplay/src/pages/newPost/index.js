import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { verifyToken } from '../../api';
import PostForm from '../../components/postForm';
import { LoggedUserContext } from '../../utils/loggedUserProvider';

export default function NewPost() {
  const history = useHistory();
  const { loggedUser } = useContext(LoggedUserContext);
  const [token] = useState(localStorage.getItem('letsplay_token'));

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (!result) history.push('/');
    } else {
      history.push('/');
    }
  }, [token]);

  return <PostForm ownerId={loggedUser.id} />;
}
