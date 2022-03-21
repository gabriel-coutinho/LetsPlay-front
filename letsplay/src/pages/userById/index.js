import React from 'react';
import { useParams } from 'react-router-dom';
import UserViewById from '../../components/userViewById';

export default function UserById() {
  const { idUser } = useParams();

  return <UserViewById idUser={idUser} />;
}
