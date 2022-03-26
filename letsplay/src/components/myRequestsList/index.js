import React, { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MyRequestsCard from '../myRequestsCard';
import { getMyRequests } from '../../api';
import Spinner from '../spinnerLoading';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { useStyles } from './styles';
import { RequestsContext } from './contexts';

export default function MyRequestsList() {
  const style = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const { loggedUser } = useContext(LoggedUserContext);
  const [myRequests, setMyRequests] = useState([]);
  const [shouldUpdateRequests, setShouldUpdateRequests] = useState(false);

  useEffect(async () => {
    const response = await getMyRequests(1, setIsLoading);
    if (response) setMyRequests(response?.data.rows);
  }, [loggedUser, shouldUpdateRequests]);

  const updateRequests = () => {
    setShouldUpdateRequests(!shouldUpdateRequests);
  };

  const getPosts = async () => {
    const result = await getMyRequests(pageNumber, setIsLoading);
    return result?.data;
  };

  const getData = async () => {
    const newRequests = await getPosts();
    setMyRequests((prevPosts) => [...prevPosts, ...newRequests.rows]);
    setHasMore(newRequests.pages > pageNumber);
    setPageNumber((prevNumber) => prevNumber + 1);
  };

  return (
    <>
      <div className={style.spinner}>{isLoading && <Spinner />}</div>
      <div className={style.root}>
        <InfiniteScroll dataLength={myRequests.length} next={getData} hasMore={hasMore}>
          <RequestsContext.Provider value={{ updateRequests }}>
            {myRequests.map((request) => (
              <MyRequestsCard key={request.id} request={request} />
            ))}
          </RequestsContext.Provider>
        </InfiniteScroll>
      </div>
    </>
  );
}
