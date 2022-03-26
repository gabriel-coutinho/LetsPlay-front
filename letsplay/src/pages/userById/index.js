import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { verifyToken } from '../../api';
import UserViewById from '../../components/userViewById';

export default function UserById() {
  const history = useHistory();
  const { idUser } = useParams();
  const [token] = useState(localStorage.getItem('letsplay_token'));

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (!result) history.push('/');
    } else {
      history.push('/');
    }
  }, [token]);

  return <UserViewById idUser={idUser} />;
}
