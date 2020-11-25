import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useMutation} from '@apollo/client';
import {TOGGLE_SUBSCRIBE} from '../../utils/api/userApi';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {NavLink} from 'react-router-dom';
import {Box} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: '100%',
      height: '100%',
    }
  })
);

interface IProps {
  avatar: string,
  isSubscribed: boolean,
  isCurrentUser: boolean,
  userId: string
}

const AvatarPanel: React.FC<IProps> = props => {
  const classes = useStyles();
  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribed);
  const [toggleSubscribe, {loading}] = useMutation(TOGGLE_SUBSCRIBE,)

  const handleSubscribe = () => {
    toggleSubscribe({variables: {id: props.userId}}).then(res => {
      setIsSubscribed(!isSubscribed);
    });
  }

  return (
    <>
      <Avatar
        variant="rounded"
        className={classes.avatar}
        src={props.avatar}
      />
      {!props.isCurrentUser && (
        <>
          <Box mt={2}>
            <Button
              onClick={handleSubscribe}
              variant='contained'
              color='primary'
              fullWidth
              disabled={loading}
            >
              {isSubscribed ? 'Отписаться' : 'Подписаться'}
            </Button>
          </Box>
          <Box mt={2}>
            <NavLink to={`/dialogs/${props.userId}`}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
              >
                Написать
              </Button>
            </NavLink>
          </Box>
        </>
      )}
    </>
  );
}

export default AvatarPanel;