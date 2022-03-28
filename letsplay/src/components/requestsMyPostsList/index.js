import React, { useEffect, useState } from 'react';
import PostsCardMyRequest from '../postCardMyRequest';
import { getMyPostsWithReq } from '../../api';
import Spinner from '../spinnerLoading';
import { useStyles } from './styles';
import { PostRequestsContext } from './contexts';

export default function requestsMyPostList() {
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);

  useEffect(async () => {
    const response = await getMyPostsWithReq(setIsLoading);
    if (response) setMyPosts(response.data);
  }, [shouldUpdatePosts]);

  const updatePosts = () => {
    setShouldUpdatePosts((prev) => !prev);
  };

  return (
    <>
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
      <div className={style.root}>
        <PostRequestsContext.Provider value={{ updatePosts }}>
          {myPosts.map((post) => (
            <PostsCardMyRequest key={post.id} post={post} />
          ))}
        </PostRequestsContext.Provider>
      </div>
    </>
  );
}
