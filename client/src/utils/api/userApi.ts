import {gql} from '@apollo/client';

export const GET_USERS = gql`
  query users($subscriptionsOnly: Boolean) {
    users(subscriptionsOnly: $subscriptionsOnly) {
      id,
      firstName,
      lastName,
      email,
      avatar
    }
  }
`;

export const GET_USER = gql`
  query user($id: ID) {
  user(id: $id) {
    firstName,
    lastName,
    email,
    isSubscribed
  }
}
`;

export const TOGGLE_SUBSCRIBE = gql`
 mutation toggleSubscribe($id: ID!){
   toggleSubscribe(id: $id){
     success
   }
 }
`;