import React, {useContext} from 'react';
import {AuthContext} from "../utils/context/AuthContext";
import {ThemesContext} from "../utils/context/ThemeContext";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from "@material-ui/core/Button";
import MailIcon from '@material-ui/icons/Mail';
import DarkThemeIcon from '@material-ui/icons/Brightness7';
import LightThemeIcon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    }
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const {logout} = useContext(AuthContext);
  const {isDarkMode, toggleTheme} = useContext(ThemesContext);

  const handleToggleTheme = () => {
    toggleTheme();
  }

  const handleLogout = () => {
    logout();
  }

  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar>
          <Typography variant="h6" noWrap>
            My React App
          </Typography>
          <div className={classes.grow}/>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <MailIcon/>
            </Badge>
          </IconButton>
          <IconButton onClick={handleToggleTheme} color="inherit">
            {isDarkMode ? <DarkThemeIcon/> : <LightThemeIcon/>}
          </IconButton>
          <Button
            color='inherit'
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;