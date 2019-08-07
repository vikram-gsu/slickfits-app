import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

function createClient({ headers }) {
  return new ApolloClient({
    link: httpLink,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    },
    cache: new InMemoryCache()
  });
}

export default withApollo(createClient);
