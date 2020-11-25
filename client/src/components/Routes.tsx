import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Suspense} from 'react';
import Loader from './Loader';

const AuthPage = React.lazy(() => import('../pages/auth/AuthPage'));
const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));
const FriendsPage = React.lazy(() => import('../pages/users/UsersPage'));
const DialogsPage = React.lazy(() => import('../pages/dialogs/DialogsPage'));

interface IRoutesProps {
  isAuth: boolean
}

const Routes: React.FC<IRoutesProps> = ({isAuth}) => {
  if (isAuth) {
    return (
      <Switch>
        <LazyRoute path='/profile/:id?' component={<ProfilePage/>}/>
        <LazyRoute path='/friends' component={<FriendsPage/>}/>
        <LazyRoute path='/dialogs/:id?' component={<DialogsPage/>}/>
        <Redirect to='/profile'/>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <LazyRoute path='/auth' component={<AuthPage/>}/>
        <Redirect to='/auth'/>
      </Switch>
    );
  }
}

interface IRouteProps {
  path: string,
  component: JSX.Element
}

const LazyRoute: React.FC<IRouteProps> = ({path, component}) => {
  return (
    <Route path={path} render={() => (
      <Suspense fallback={<Loader open={true}/>}>
        {component}
      </Suspense>
    )}/>
  );
}

export default Routes;