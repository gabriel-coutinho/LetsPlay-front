import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import { useStyles } from './styles';
import MyIncludesPosts from '../../components/myIncludesPosts';
import MyPostsComponent from '../../components/myPostsComponent';
import { CustomTabs } from '../../components/styles/tab.style';
import { verifyToken } from '../../api';

export default function MyPosts() {
  const history = useHistory();
  const style = useStyles();
  const [value, setValue] = useState(0);
  const [token] = useState(localStorage.getItem('letsplay_token'));

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (!result) history.push('/');
    } else {
      history.push('/');
    }
  }, [token]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });

  return (
    <div>
      <AppBar position="static" className={style.appBar}>
        <CustomTabs
          scrollButtons="off"
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="simple tabs example"
        >
          <Tab label="Meus posts" {...a11yProps(0)} />
          <Tab label="Posts que estou incluido" {...a11yProps(1)} />
        </CustomTabs>
      </AppBar>
      <div className={style.root} hidden={value !== 0}>
        <MyPostsComponent />
      </div>
      <div className={style.root} hidden={value !== 1}>
        <MyIncludesPosts />
      </div>
    </div>
  );
}
