import * as React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      listStyle: 'none'
    },
    link: {
      textDecoration: 'none',
    }
  })
);

const Nav: React.FC = () => {
  const classes = useStyles();

  return (
    <ul className={classes.wrapper}>
      <Link to='/profile' text='Моя страница' />
      <Link to='/friends' text='Друзья' />
      <Link to='/dialogs' text='Сообщения' />
    </ul>
  );
}

interface ILinkProps {
  to: string,
  text: string
}

const Link: React.FC<ILinkProps> = props => {
  const classes = useStyles();

  return (
    <li>
      <NavLink className={classes.link} to={props.to}>
        <Button color="primary">
          {props.text}
        </Button>
      </NavLink>
    </li>
  );
}

export default Nav;