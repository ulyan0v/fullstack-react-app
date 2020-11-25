import React, {useContext} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {AuthContext} from "./AuthContext";

const Apollo: React.FC = ({children}) => {
  const {token} = useContext(AuthContext);

  const client = new ApolloClient<NormalizedCacheObject>({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: token
    }
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default Apollo;