import * as React from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import defaultAvatar from '@/assets/default_avatar.jpg';
import Avatar from "@material-ui/core/Avatar";
import {Button} from "@material-ui/core";

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

const UserCard: React.FC = props => {
  const classes = useStyles();

  return (
    <Card className={classes.wrapper}>
      <CardContent className={classes.content}>
        <div>
          <Typography component="h4" variant="h6" noWrap>
            Псина Сутулая
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Статус
          </Typography>
        </div>
        <div>
          <Button color='primary' size='small'>
            <Typography className={classes.button} variant="subtitle2" noWrap>
              Написать собщение
            </Typography>
          </Button>
        </div>
      </CardContent>
      <div>
        <Avatar variant='square' className={classes.avatar} src={defaultAvatar}/>
      </div>
    </Card>
  );
}

export default UserCard;