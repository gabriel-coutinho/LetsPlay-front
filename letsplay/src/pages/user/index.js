import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { verifyToken } from '../../api';
import UserView from '../../components/userView';

export default function User() {
  const history = useHistory;
  const [token] = useState(localStorage.getItem('letsplay_token'));

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (!result) history.push('/');
    } else {
      history.push('/');
    }
  }, [token]);

  return <UserView />;
}
