import React, {useContext, useReducer, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, Theme} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {AuthContext} from "../../utils/context/AuthContext";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  }
}));

const AuthPage: React.FC = () => {
  const classes = useStyles();
  const {login} = useContext(AuthContext);
  const [value, setValue] = React.useState('signIn');
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
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
          <Tab value='signIn' label="Вход"/>
          <Tab value='signUp' label="Регистрация"/>
        </Tabs>
        <Box p={2}>
          {value === 'signUp' &&
          <SignUp
            login={login}
            changeFormField={changeFormField}
            formFields={formFields}
          />
          }
          {value === 'signIn' &&
            <SignIn
              login={login}
              changeFormField={changeFormField}
              formFields={{
                email: formFields.email,
                password: formFields.password
              }}
            />
          }
        </Box>
      </Paper>
    </div>
  );
}

export default AuthPage;