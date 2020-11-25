import {gql} from '@apollo/client';

export const GET_MESSAGES = gql`
  query messages($id: ID!) {
    messages(id: $id) {
      from,
      to,
      text
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($id: ID!, $text: String!) {
    sendMessage(id: $id, text: $text) {
      from,
      to,
      text
    }
  }
`;