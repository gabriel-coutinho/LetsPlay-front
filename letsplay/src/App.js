import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import NewPost from './pages/newPost';
import Help from './pages/help';
import User from './pages/user';
import EditUser from './pages/editUser';
import ChangePassword from './pages/changePassword';
import Requests from './pages/requests';
import UserById from './pages/userById';
import MyPosts from './pages/myPosts';
import PostsByUserId from './pages/postsByUserId';
import EditPost from './pages/editPost';
import PostById from './pages/postById';
import NotFound from './pages/notFound';
import NavBar from './components/navBar';
import { LoggedUserProvider } from './utils/loggedUserProvider';
import { verifyToken } from './api';

toast.configure();
function App() {
  const token = localStorage.getItem('letsplay_token');
  const [validToken, setValidToken] = useState(false);

  useEffect(async () => {
    if (token) {
      const result = await verifyToken(token);
      if (result) setValidToken(true);
    }
  }, [token]);

  return (
    <>
      <Router>
        <main>
          <LoggedUserProvider>
            {validToken && <NavBar />}
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/newPost">
                <NewPost />
              </Route>
              <Route exact path="/help">
                <Help />
              </Route>
              <Route exact path="/me">
                <User />
              </Route>
              <Route exact path="/me/edit">
                <EditUser />
              </Route>
              <Route exact path="/me/changePassword">
                <ChangePassword />
              </Route>
              <Route exact path="/requests">
                <Requests />
              </Route>
              <Route exact path="/user/:idUser">
                <UserById />
              </Route>
              <Route exact path="/myPosts">
                <MyPosts />
              </Route>
              <Route exact path="/user/:idUser/posts">
                <PostsByUserId />
              </Route>
              <Route exact path="/editPost/:idPost">
                <EditPost />
              </Route>
              <Route exact path="/post/:idPost">
                <PostById />
              </Route>
              <Route exact path="/*">
                {!validToken ? <Redirect to="/" /> : <NotFound />}
              </Route>
            </Switch>
          </LoggedUserProvider>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
