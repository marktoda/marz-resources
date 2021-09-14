import { gql } from '@apollo/client';

export interface Token {
    id: string;
}

export interface Tokens {
    tokens: Token[];
}

export const GET_TOKENS = gql`
  query getUserTokens($address: ID!) {
      tokens(first: 1000, where: { owner: $address }) {
          id
      }
  }
`;
