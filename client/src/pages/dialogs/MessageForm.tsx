import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {SEND_MESSAGE} from '../../utils/api/messageApi';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper : {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
}));

interface IProps {
  id: string
}

const MessageForm: React.FC<IProps> = ({id}) => {
  const classes = useStyles();
  const [sendMessage, {loading}] = useMutation(SEND_MESSAGE);
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    if (!text) return;

    sendMessage({variables:{id, text}}).then(() => {
      setText('');
    });

    event.preventDefault();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      p={2}
      className={classes.wrapper}
    >
      <TextField
        label='Напишите сообщение...'
        fullWidth
        variant='outlined'
        value={text}
        onChange={handleChange}
      />
      <Box ml={2} my='auto' display='flex'>
        <Button
          disabled={loading}
          type='submit'
          color='primary'
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
}

export default MessageForm;