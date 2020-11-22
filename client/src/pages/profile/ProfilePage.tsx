import * as React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
// @ts-ignore
import defaultAvatar from '@/assets/default_avatar.jpg';
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Post from "./Post";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2)
    },
    avatar: {
      width: '100%',
      height: '100%',
      marginBottom: theme.spacing(2)
    }
  })
);

const ProfilePage = () => {
  const classes = useStyles();

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Avatar variant="rounded" className={classes.avatar} src={defaultAvatar} />
          <Button variant='contained' color='primary' fullWidth>
            Подписаться
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper className={classes.paper}>
          <Typography variant='h4' component='h2' gutterBottom>
            Псина Сутулая
          </Typography>
          <Divider  />

        </Paper>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Post />
          </Grid>
          <Grid xs={6} item>
            <Post />
          </Grid>
          <Grid xs={6} item>
            <Post />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;