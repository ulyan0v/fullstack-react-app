import * as React from 'react';
import UserCard from "./UserCard";
import Grid from '@material-ui/core/Grid'

const FriendsPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <UserCard />
      </Grid>
      <Grid item xs={4}>
        <UserCard />
      </Grid>
      <Grid item xs={4}>
        <UserCard />
      </Grid>
      <Grid item xs={4}>
        <UserCard />
      </Grid>
    </Grid>
  );
}

export default FriendsPage;