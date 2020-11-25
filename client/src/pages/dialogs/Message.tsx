import React from 'react';
import Card from "@material-ui/core/Card";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, Box} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex'
  },
  message: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  avatar: {
    margin: `0 ${theme.spacing(1)}px`
  }
}));

const Message: React.FC = props => {
  const classes = useStyles();

  return (
    <Box my={1} className={classes.wrapper}>
      <Avatar className={classes.avatar}>EP</Avatar>
      <Card className={classes.message}>
        123
      </Card>
    </Box>
  );
}

export default Message;