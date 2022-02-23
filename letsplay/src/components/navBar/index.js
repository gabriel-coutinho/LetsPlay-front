import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconUser from '../icons/iconUser';
import IconLogo from '../icons/iconLogo';

import '../../pages/login/login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#F39189',
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const logout = () => localStorage.removeItem('letsplay_token');

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
          <Tab
            icon={<IconUser />}
            onClick={() => {
              history.push('/register');
            }}
          />
        </Tabs>
        <div style={{ marginRight: '50px' }}>
          <Avatar className={classes.avatar} onClick={handleClick}>
            N
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
    </div>
  );
}
