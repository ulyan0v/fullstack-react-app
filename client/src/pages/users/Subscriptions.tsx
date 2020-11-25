import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_USERS} from '../../utils/api/userApi';
import {User} from '../../utils/Types';
import UserCard from './UserCard';
import Loader from '../../components/Loader';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

const Subscriptions: React.FC = () => {
  const {data, loading, refetch} = useQuery(GET_USERS, {variables: {subscriptionsOnly: true}});

  useEffect(() => {
    if (data) refetch();
  }, []);

  if (loading) return <Loader open={loading}/>;

  const users = data.users.map((user: User) => {
    return (
      <Grid item xs={6}>
        <UserCard
          avatar={user.avatar || ''}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          id={user.id}
          key={user.id}
        />
      </Grid>
    )
  });

  if (!users.length)
    return <Typography style={{width: '100%'}} align='center'>Вы пока ни на кого не подписаны</Typography>;

  return (
    <Grid container spacing={3}>
      {users}
    </Grid>
  );
}

export default Subscriptions