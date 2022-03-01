import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import NotFound from './pages/notFound';
import NavBar from './components/navBar';

const queryClient = new QueryClient();
const token = localStorage.getItem('letsplay_token');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main>
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
            <Route exact path="/*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
