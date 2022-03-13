import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconUser from '../icons/iconUser';
import IconLogo from '../icons/iconLogo';
import { useStyles } from './styles';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import '../../pages/login/login.css';

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const [avatarText, setAvatarText] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { loggedUser } = useContext(LoggedUserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const logout = () => localStorage.removeItem('letsplay_token');

  useEffect(() => {
    setAvatarText(
      loggedUser.name?.charAt(0).toUpperCase() + loggedUser.lastName?.charAt(0).toUpperCase()
    );
    if (Object.keys(loggedUser).length !== 0) {
      setIsLoading(false);
    }
  }, [loggedUser]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    history.push('/register');
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      {!isLoading && (
        <AppBar
          position="static"
          style={{
            backgroundColor: '#046582',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Tabs variant="scrollable" scrollButtons="off">
            <Tab
              icon={<IconLogo />}
              onClick={() => {
                history.push('/home');
              }}
            />
            <Tab
              icon={<IconUser />}
              onClick={() => {
                history.push('/register');
              }}
            />
            <Tab
              icon={<IconUser />}
              onClick={() => {
                history.push('/register');
              }}
            />
            <Tab
              icon={<IconUser />}
              onClick={() => {
                history.push('/register');
              }}
            />
            <Tab
              icon={<IconUser />}
              onClick={() => {
                history.push('/register');
              }}
            />
            <Tab
              icon={<IconUser />}
              onClick={() => {
                history.push('/register');
              }}
            />
          </Tabs>
          <div style={{ marginRight: '50px' }}>
            <Avatar className={classes.avatar} onClick={handleClick}>
              {avatarText}
            </Avatar>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Meu perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </div>
        </AppBar>
      )}
    </div>
  );
}
