import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {CONFIRM_AUTH} from "./utils/api/authApi";
import io from 'socket.io-client';
import Routes from './components/Routes';
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Box from '@material-ui/core/Box';
import Loader from "./components/Loader";
import './style.css';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const {data, loading} = useQuery(CONFIRM_AUTH);

  useEffect(() => {
    if (!data) return;
    setIsAuth(data.confirmAuth.success);
  }, [data]);

  return (
    <>
      <CssBaseline/>
      <Loader open={loading} />
      {isAuth && <Header/>}
      <Container fixed>
        <Grid container>
          <Grid item xs={2}>
            {isAuth && <Nav/>}
          </Grid>
          <Grid item xs={isAuth ? 10 : 12}>
            <Box py={2}>
              <Routes isAuth={isAuth}/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;