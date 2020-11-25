import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper : {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
}));

const MessageForm: React.FC = props => {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.wrapper}>
      <TextField label='Что у вас нового?' fullWidth variant='outlined'/>
      <Box ml={2} my='auto' display='flex'>
        <Button color='primary'>
          Опубликова
        </Button>
      </Box>
    </Box>
  );
}

export default MessageForm;