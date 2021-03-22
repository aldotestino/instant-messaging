import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const isProduction = process.env.NODE_ENV === 'production';

const SERVER_URI = isProduction ? 'api-instant-messaging.herokuapp.com' : 'localhost:4000';

const httpLink = new HttpLink({ uri: `http${isProduction ? 's' : ''}://${SERVER_URI}/graphql` });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token') || ''
  }
}));

const wsLink = new WebSocketLink({
  uri: `ws${isProduction ? 's' : ''}://${SERVER_URI}/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      authorization: localStorage.getItem('token') || ''
    }),
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});