import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {GET_USERS} from '../../utils/api/userApi';
import {User} from '../../utils/Types';
import {useRouteMatch} from "react-router";
import {makeStyles, Theme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Loader from '../../components/Loader';
import MessageForm from './MessageForm';
import Grid from '@material-ui/core/Grid';
import DialogCard from './DialogCard';
import Paper from '@material-ui/core/Paper';
import Messages from './Messages';

const useStyles = makeStyles((theme: Theme) => ({
  chat: {
    position: 'relative',
    height: '100%'
  },
  wrapper: {
    height: window.innerHeight - theme.spacing(12),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabText: {
    textTransform: 'none'
  }
}));

const DialogsPage: React.FC = () => {
  const classes = useStyles();
  const {params} = useRouteMatch<{ id: string }>();

  const {data, loading, refetch} = useQuery(GET_USERS, {variables: {subscriptionsOnly: true}});

  useEffect(() => {
    if (data) refetch();
  }, []);

  if (loading) return <Loader open={true}/>

  const dialogs = data.users.map((user: User) => {
    return <DialogCard
      firstName={user.firstName}
      lastName={user.lastName}
      avatar={user.avatar || ''}
      id={user.id}
      key={user.id}/>
  });

  return (
    <Paper className={classes.wrapper}>
      <Grid container style={{height: '100%'}}>
        <Grid item container direction='column' xs={3} className={classes.tabs}>
          {dialogs}
        </Grid>
        <Grid item xs={9}>
          <Box className={classes.chat}>
            {params.id && (
              <>
                <Messages id={params.id}/>
                <MessageForm id={params.id}/>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DialogsPage;