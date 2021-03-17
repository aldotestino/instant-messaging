import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getTokenFromLocalStorage } from './authHelpers';
import { getMainDefinition } from '@apollo/client/utilities';

const isProduction = process.env.NODE_ENV === 'production';

const SERVER_URI = isProduction ? 'server-instant-messaging.herokuapp.com' : '192.168.1.104:4000';

const httpLink = new HttpLink({ uri: `http${isProduction ? 's' : ''}://${SERVER_URI}` });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: getTokenFromLocalStorage()
  }
}));

const wsLink = new WebSocketLink({
  uri: `ws://${SERVER_URI}/graphql`,
  options: {
    connectionParams: {
      authorization: getTokenFromLocalStorage(),
    },
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