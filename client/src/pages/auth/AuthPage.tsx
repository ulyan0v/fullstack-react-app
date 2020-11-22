import React, {useReducer, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, Theme} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {connect} from "react-redux";
import actions from "../../redux/globalReducer";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

interface IProps {
  login: (id: string, token: string) => void
}

const AuthPage: React.FC<IProps> = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const changeFormField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.wrapper}>
      <Paper>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
        >
          <Tab label="Вход"/>
          <Tab label="Регистрация"/>
        </Tabs>
        <Box p={2}>
          {value
            ? <SignUp
              login={props.login}
              formFields={formFields}
              changeFormField={changeFormField}
            />
            : <SignIn
              login={props.login}
              formFields={{
                email: formFields.email,
                password: formFields.password
              }}
              changeFormField={changeFormField}
            />
          }
        </Box>
      </Paper>
    </div>
  );
}

const mapDispatchToProps = {
  login: actions.login
}

export default connect(null, mapDispatchToProps)(AuthPage);