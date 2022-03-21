import React, { useContext } from 'react';
import PostForm from '../../components/postForm';
import { LoggedUserContext } from '../../utils/loggedUserProvider';

export default function NewPost() {
  const { loggedUser } = useContext(LoggedUserContext);

  return <PostForm ownerId={loggedUser.id} />;
}
