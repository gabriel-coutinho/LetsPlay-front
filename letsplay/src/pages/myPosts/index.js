import React, { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from '../../components/postCard';
import { getMyPosts } from '../../api';
import Spinner from '../../components/spinnerLoading';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { useStyles } from './styles';
import { PostsContext } from '../home/contexts';

function MyPosts() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const { loggedUser } = useContext(LoggedUserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);

  useEffect(async () => {
    const response = await getMyPosts(1, setIsLoading);
    if (response) setMyPosts(response?.data.rows);
  }, [loggedUser, shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts(!shouldUpdatePosts);
  };

  const getPosts = async () => {
    const result = await getMyPosts(pageNumber, setIsLoading);
    return result?.data;
  };

  const getData = async () => {
    const newPosts = await getPosts();
    setMyPosts((prevPosts) => [...prevPosts, ...newPosts.rows]);
    setHasMore(newPosts.pages > pageNumber);
    setPageNumber((prevNumber) => prevNumber + 1);
  };

  return (
    <>
      <div className={classes.spinner}>{isLoading && <Spinner />}</div>
      <div className={classes.root}>
        <InfiniteScroll dataLength={myPosts.length} next={getData} hasMore={hasMore}>
          <PostsContext.Provider value={{ updatePosts }}>
            {myPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostsContext.Provider>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default MyPosts;
