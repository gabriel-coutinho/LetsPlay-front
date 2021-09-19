import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import NotFound from './pages/notFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/home/:id">
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
