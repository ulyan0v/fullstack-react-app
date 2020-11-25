import React from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    avatar: {
      width: '100%',
      height: '100%'
    },
    button: {
      fontSize: '14px'
    }
  }),
);

interface IProps {
  avatar: string,
  firstName: string,
  lastName: string,
  email: string,
  id: string
}

const UserCard: React.FC<IProps> = props => {
  const classes = useStyles();
  const {avatar, firstName, lastName, email, id} = props;

  return (
    <Card className={classes.wrapper}>
      <CardContent className={classes.content}>
        <div>
          <NavLink to={`/profile/${id}`}>
            <Typography color='textPrimary' component="h4" variant="h6" noWrap>
              {`${firstName} ${lastName}`}
          </Typography>
        </NavLink>
        <Typography variant="subtitle1" color="textSecondary">
          {email}
        </Typography>
      </div>
      <div>
        <NavLink to={`/dialogs/${id}`}>
          <Button color='primary' size='small'>
            <Typography className={classes.button} variant="subtitle2" noWrap>
              Написать собщение
            </Typography>
          </Button>
        </NavLink>
      </div>
    </CardContent>
  <div>
    <NavLink to={`/dialogs/${id}`}>
      <Avatar variant='square' className={classes.avatar} src={avatar}/>
    </NavLink>
  </div>
</Card>
);
}

export default UserCard;