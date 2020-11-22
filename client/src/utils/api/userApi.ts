import {gql} from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      firstName,
      lastName,
      email
    }
  }
`;

export const GET_USER = gql`
  mutation user($id: ID) {
    user(id: $id) {
      firstName,
      lastName,
      email,
      avatar
    }
  }
`;

export const REGISTER = gql`
  mutation(
    $email: String,
    $password:  String,
    $firstName: String,
    $lastName: String
  ) {
    register(
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName
    ) {
      id,
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String, $password: String) {
  login(email: $email, password: $password) {
    id,
    token
  }
}
`;