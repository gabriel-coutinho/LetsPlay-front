import React, { createContext, useState, useEffect } from 'react';
import { getLoggedUser } from '../api';

const LoggedUserContext = createContext([{}, () => {}]);

const LoggedUserProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(async () => {
    const response = await getLoggedUser();
    setLoggedUser(response?.data);
  }, []);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {props.children}
    </LoggedUserContext.Provider>
  );
};

export { LoggedUserContext, LoggedUserProvider };
