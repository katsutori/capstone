import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';

import * as sessionActions from './store/session';

// Import non-auth components
import SplashNavigation from './components/Splash/Navigation';
import Footer from './components/Splash/Footer';
import SplashPage from './components/Splash/SplashPage';

// Import auth components
import LogoutButton from './components/auth/LogoutButton'

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(sessionActions.authenticate()).then(() => setLoaded(true))
    })();
  }, [dispatch, loaded]);

  if (!user) {
    return (
      <BrowserRouter>
        <SplashNavigation />
          <Switch>
            <Route path='/' exact={true}>
              <SplashPage view='normal'/>
            </Route>
            <Route path='/login' exact={true}>
              <SplashPage view='login'/>
            </Route>
            <Route path='/signup' exact={true}>
              <SplashPage view='signup'/>
            </Route>
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
        <Footer />
      </BrowserRouter>
    )
  }

  return loaded && (
    <BrowserRouter>

      <Switch>
        <Route path='/' exact={true}>
          <h1>Hi</h1>
          <LogoutButton />
        </Route>
        <Route path='/login' exact={true}>
          <SplashPage view='login'/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SplashPage view='signup'/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
