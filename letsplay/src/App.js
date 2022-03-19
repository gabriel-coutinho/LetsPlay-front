import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import NewPost from './pages/newPost';
import NotFound from './pages/notFound';
import NavBar from './components/navBar';
import { LoggedUserProvider } from './utils/loggedUserProvider';

toast.configure();
function App() {
  const token = localStorage.getItem('letsplay_token');

  return (
    <>
      <Router>
        <main>
          <LoggedUserProvider>
            {token && <NavBar />}
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
              <Route exact path="/*">
                <NotFound />
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
