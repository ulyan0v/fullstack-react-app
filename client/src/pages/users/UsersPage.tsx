import React from 'react';
import Subscriptions from "./Subscriptions";
import Search from "./Search";
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    padding: theme.spacing(1)
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
  }
}));

const UsersPage: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('subscribes');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item container xs={9} spacing={2} className={classes.wrapper}>
        {value === 'subscribes' && <Subscriptions />}
        {value === 'search' && <Search />}
      </Grid>
      <Grid item xs={3}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab value='subscribes' label='Подписки' />
          <Tab value='search' label='Поиск' />
        </Tabs>
      </Grid>
    </Grid>
  );
}

export default UsersPage;