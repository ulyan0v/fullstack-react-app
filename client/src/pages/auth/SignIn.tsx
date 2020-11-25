import React from 'react';
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../utils/api/authApi";
import {makeStyles, Theme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

interface IProps {
  formFields: {
    email: string,
    password: string
  },
  changeFormField(event: React.ChangeEvent<HTMLInputElement>): void,
  login: (id: string, token: string) => void
}

const SignIn: React.FC<IProps> = props => {
  const classes = useStyles();
  const {email, password} = props.formFields;

  const [login, {loading}] = useMutation(LOGIN);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    login({
      variables: {
        email,
        password
      }
    }).then(res => {
      console.log(res)
      const {id, token} = res.data.login;
      props.login(id, token);
    });
  }

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit}>
      <FormControl margin='dense'>
        <InputLabel htmlFor="form-fields-email">Email</InputLabel>
        <Input
          type='email'
          id="form-fields-email"
          required
          name='email'
          value={email}
          onChange={props.changeFormField}
          disabled={loading}
        />
      </FormControl>
      <FormControl margin='dense'>
        <InputLabel htmlFor="form-fields-password">Password</InputLabel>
        <Input
          type='password'
          id="form-fields-password"
          required
          name='password'
          value={password}
          onChange={props.changeFormField}
          disabled={loading}
        />
      </FormControl>
      <Box mt={2}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={loading}
        >
          Войти
        </Button>
      </Box>
    </form>
  );
}

export default SignIn;