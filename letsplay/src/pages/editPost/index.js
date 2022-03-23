import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostContext } from './contexts';
import Spinner from '../../components/spinnerLoading';
import { useStyles } from './styles';
import { getPostById } from '../../api';
import EditPostForm from '../../components/editPostForm';
import { LoggedUserContext } from '../../utils/loggedUserProvider';

export default function EditPost() {
  const history = useHistory();
  const style = useStyles();
  const { idPost } = useParams();
  const { loggedUser } = useContext(LoggedUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [postById, setPostById] = useState({});
  const [comparable, setComparable] = useState(false);

  useEffect(() => {
    if (Object.keys(loggedUser).length !== 0) {
      setComparable(true);
    }
  }, [loggedUser]);

  useEffect(async () => {
    if (Object.keys(loggedUser).length !== 0) {
      const result = await getPostById(idPost, setIsLoading);
      if (result) {
        if (result.data.owner.id !== loggedUser.id) {
          toast('Você não pode atualizar um post que não é seu!');
          history.push('/home');
        } else {
          setPostById(result.data);
        }
      }
    }
  }, [comparable]);

  return (
    <PostContext.Provider value={{ postById }}>
      {!isLoading && <EditPostForm />}
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
    </PostContext.Provider>
  );
}
