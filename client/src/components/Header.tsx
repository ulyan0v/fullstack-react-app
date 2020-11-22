import * as React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import DarkThemeIcon from '@material-ui/icons/Brightness7';
import LightThemeIcon from '@material-ui/icons/Brightness4';
import {connect} from "react-redux";
import {State} from "../redux/store";
import actions from "../redux/globalReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    }
  })
);

interface IProps {
  darkMode: boolean,
  toggleTheme: () => void
}

const Header: React.FC<IProps> = props => {
  const classes = useStyles();

  const handleToggleTheme = () => {
    props.toggleTheme();
  }

  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar>
          <Typography variant="h6" noWrap>
            My React App
          </Typography>
          <div className={classes.grow} />
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <MailIcon/>
            </Badge>
          </IconButton>
          <IconButton onClick={handleToggleTheme} color="inherit">
            {props.darkMode ? <DarkThemeIcon/> : <LightThemeIcon/>}
          </IconButton>
          <IconButton
            edge="end"
            color="inherit">
            <AccountCircle/>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const mapStateToProps = (state: State) => {
  return {
    darkMode: state.global.darkMode,
  };
}

const mapDispatchToProps = {
  toggleTheme: actions.toggleTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);