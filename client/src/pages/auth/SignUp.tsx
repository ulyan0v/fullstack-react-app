import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {REGISTER} from "../../utils/api/authApi";
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
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  },
  changeFormField(event: React.ChangeEvent<HTMLInputElement>): void,
  login: (id: string, token: string) => void
}

const SignUp: React.FC<IProps> = props => {
  const classes = useStyles();
  const {firstName, lastName, email, password, confirmPassword} = props.formFields;

  const [addUser, {loading}] = useMutation(REGISTER);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) return;
    addUser({
      variables: {
        firstName,
        lastName,
        email,
        password
      }
    }).then(res => {
      const {id, token} = res.data.register;
      props.login(id, token);
    });
  }

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit}>
      <FormControl margin='dense'>
        <InputLabel htmlFor="form-fields-firstname">Имя</InputLabel>
        <Input
          type='text'
          id="form-fields-firstname"
          required
          name='firstName'
          value={firstName}
          onChange={props.changeFormField}
          disabled={loading}
        />
      </FormControl>
      <FormControl margin='dense'>
        <InputLabel htmlFor="form-fields-lastname">Фамилия</InputLabel>
        <Input
          type='text'
          id="form-fields-lastname"
          required
          name='lastName'
          value={lastName}
          onChange={props.changeFormField}
          disabled={loading}
        />
      </FormControl>
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
        <InputLabel htmlFor="form-fields-password">Пароль</InputLabel>
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
      <FormControl margin='dense'>
        <InputLabel htmlFor="form-fields-confirm-password">Подтвердить пароль</InputLabel>
        <Input
          type='password'
          id="form-fields-confirm-password"
          required
          name='confirmPassword'
          value={confirmPassword}
          error={password !== confirmPassword}
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
          Регистрация
        </Button>
      </Box>
    </form>
  );
}

export default SignUp;