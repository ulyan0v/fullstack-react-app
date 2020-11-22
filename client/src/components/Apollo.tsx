import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {connect} from "react-redux";
import {State} from "../redux/store";

interface IProps {
  token: string | null
}

const Apollo: React.FC<IProps> = props => {
  const client = new ApolloClient<NormalizedCacheObject>({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: props.token || ''
    }
  });
  console.log('new client, ПИЗДЕЦ')
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}

const mapStateToProps = (state: State) => {
  return {
    token: state.global.token
  };
}

export default connect(mapStateToProps)(Apollo);