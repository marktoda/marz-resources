import { ApolloClient, InMemoryCache } from '@apollo/client';

const SUBGRAPH_NAME = 'spacehexagon/marz';

export const SUBGRAPH_ENDPOINT = `https://api.thegraph.com/subgraphs/name/${SUBGRAPH_NAME}`;

export const client = new ApolloClient({
  uri: SUBGRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});

