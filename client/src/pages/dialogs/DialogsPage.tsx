import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";
import Message from "./Message";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../../utils/api/userApi";
import {User} from "../../utils/Types";
import {NavLink, useRouteMatch} from "react-router-dom";
import Loader from "../../components/Loader";
import MessageForm from "./MessageForm";
import Grid from '@material-ui/core/Grid';
import DialogCard from "./DialogCard";
import {Paper} from "@material-ui/core";

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

  const {data, loading} = useQuery(GET_USERS, {variables: {subscriptionsOnly: true}});

  if (loading) return <Loader open={true} />

  const dialogs = data.users.map((user: User) => {
    return <DialogCard
      firstName={user.firstName}
      lastName={user.lastName}
      avatar={user.avatar || ''}
      id={user.id}/>
  });

  return (
    <Paper className={classes.wrapper}>
      <Grid container style={{height: '100%'}}>
        <Grid item container direction='column' xs={3} className={classes.tabs}>
          {dialogs}
        </Grid>
        <Grid item xs={9}>
          <Box className={classes.chat}>
            <Message/>
            <MessageForm />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DialogsPage;