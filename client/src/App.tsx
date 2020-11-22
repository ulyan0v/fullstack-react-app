import * as React from 'react';
import Routes from './components/Routes';
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider, Theme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';
import {State} from './redux/store';
import {useMutation} from "@apollo/client";
import {GET_USER} from "./utils/api/userApi";
import {useEffect, useMemo} from "react";
import actions from "./redux/globalReducer";
import {User} from "./utils/Types";

interface IProps {
  theme: Theme,
  isAuth: boolean,
  token: string | null,
  setCurrentUser: (user: User) => void
}

const App: React.FC<IProps> = props => {
  const [getCurrentUser] = useMutation(GET_USER);

  useEffect(() => {
    console.log('token: ', props.token)
    if (props.token) {
      getCurrentUser().then(res => {
        props.setCurrentUser(res.data.user);
      });
    }
  }, [props.token]);

  return (
    <ThemeProvider theme={props.theme}>
      <CssBaseline/>
      {props.isAuth && <Header/>}
      <Container fixed>
        <Grid
          container
          direction='row'
          justify="space-evenly">
          <Grid item xs={2}>
            {props.isAuth && <Nav/>}
          </Grid>
          <Grid item xs={props.isAuth ? 10 : 12}>
            <Box py={2}>
              <Routes isAuth={props.isAuth}/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: State) => {
  return {
    theme: state.global.theme,
    isAuth: !!state.global.currentUser,
    token: state.global.token
  };
}

const mapDispatchToProps = {
  setCurrentUser: actions.setCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);