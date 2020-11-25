import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      listStyle: 'none'
    }
  })
);

const Nav: React.FC = () => {
  const classes = useStyles();

  return (
    <ul className={classes.wrapper}>
      <Link to='/profile' text='Моя страница' />
      <Link to='/friends' text='Подписки' />
      <Link to='/dialogs' text='Сообщения' />
    </ul>
  );
}

interface ILinkProps {
  to: string,
  text: string
}

const Link: React.FC<ILinkProps> = ({to, text}) => {
  return (
    <li>
      <NavLink to={to}>
        <Button color="primary">
          {text}
        </Button>
      </NavLink>
    </li>
  );
}

export default Nav;