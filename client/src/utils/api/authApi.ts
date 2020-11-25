import {gql} from '@apollo/client';

export const CONFIRM_AUTH = gql`
  query {
    confirmAuth {
      success
    }
  }
`;

export const REGISTER = gql`
  mutation(
    $email: String!,
    $password:  String!,
    $firstName: String!,
    $lastName: String!
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
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id,
    token
  }
}
`;