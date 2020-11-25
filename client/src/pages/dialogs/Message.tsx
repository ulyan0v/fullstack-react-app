import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex'
  },
  reverse: {
    flexDirection: 'row-reverse'
  },
  message: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  }
}));

interface IProps {
  isIncoming: boolean,
  text: string,
  avatar: string
}

const Message: React.FC<IProps> = props => {
  const classes = useStyles();

  return (
    <Box
      my={1}
      className={`${classes.wrapper} ${!props.isIncoming && classes.reverse}`}
    >
      <Box mx={1}>
        <Avatar src={props.avatar}/>
      </Box>
      <Card className={classes.message}>
        {props.text}
      </Card>
    </Box>
  );
}

export default Message;