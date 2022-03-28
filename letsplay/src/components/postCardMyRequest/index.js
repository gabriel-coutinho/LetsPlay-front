import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import RequestsMyPostsCard from '../requestsMyPostsCard';
import { fullDateComment } from '../../utils/dateFormat';
import { useStyles } from './styles';
import { RequestsContext } from './contexts';

export default function PostCardMyRequest({ post }) {
  const style = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { loggedUser } = useContext(LoggedUserContext);
  const [requestIcon, setRequestIcon] = useState(<NotificationsIcon />);
  const postDate = fullDateComment(post.date);
  const { requests } = post;
  const [requestsCounter] = useState(post.requests?.length);
  const title = `${post.title} - ${post.sport.name}`;

  useEffect(() => {
    setRequestIcon(expanded ? <NotificationsIcon /> : <NotificationsNoneOutlinedIcon />);
  }, [expanded]);

  useEffect(() => {
    setIsFull(post.status === 'FULL');
  }, [loggedUser]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToPostById = () => {
    history.push(`/post/${post.id}`);
  };

  return (
    <>
      {!!requestsCounter && (
        <Card className={style.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={style.avatar}>
                {loggedUser.name?.charAt(0) + loggedUser.lastName?.charAt(0)}
              </Avatar>
            }
            action={
              <div>
                <IconButton
                  className={style.expand}
                  onClick={handleExpandClick}
                  aria-label="settings"
                >
                  {requestIcon}
                  {'\u00A0'}
                  <Typography variant="subtitle1">{requestsCounter}</Typography>
                </IconButton>
              </div>
            }
            title={
              <a className={style.a} onClick={goToPostById}>
                <b>{title}</b>
              </a>
            }
            subheader={`Expira em: ${postDate}`}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <RequestsContext.Provider value={isFull}>
                {requests.map((request) => (
                  <RequestsMyPostsCard key={request.id} request={request} />
                ))}
              </RequestsContext.Provider>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
