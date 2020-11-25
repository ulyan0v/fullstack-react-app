import React, {useContext, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {AuthContext} from "../../utils/context/AuthContext";
import {useQuery} from '@apollo/client';
import {GET_USER} from '../../utils/api/userApi';
import Post from './Post';
import Loader from "../../components/Loader";
import AvatarPanel from "./AvatarPanel";
import NewPostForm from "./NewPostForm";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2)
    }
  })
);

const ProfilePage: React.FC = () => {
  const classes = useStyles();
  const {currentUserId} = useContext(AuthContext);
  const {params} = useRouteMatch<{ id: string }>();

  const {data, loading, refetch} = useQuery(GET_USER, {variables: {id: params.id}});

  useEffect(() => {
    if (data) refetch();
  }, []);

  if (loading) return <Loader open={true}/>;

  const {firstName, lastName, avatar, isSubscribed} = data.user;

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <AvatarPanel
            avatar={avatar}
            isSubscribed={isSubscribed}
            isCurrentUser={!params.id || currentUserId === params.id}
            userId={params.id}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper className={classes.paper}>
          <Typography variant='h4' component='h2' gutterBottom>
            {`${firstName} ${lastName}`}
          </Typography>
          <Divider/>
        </Paper>
        <Paper className={classes.paper}>
          <NewPostForm/>
        </Paper>

        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Post/>
          </Grid>
          <Grid xs={6} item>
            <Post/>
          </Grid>
          <Grid xs={6} item>
            <Post/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;