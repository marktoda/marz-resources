import { gql } from '@apollo/client';

export interface UserTokens {
  owners: Owner[];
}

export interface OwnedToken {
    id: string;
}

export interface Owner {
    ownedTokens: OwnedToken[];
}

export const GET_TOKENS = gql`
  query getUserTokens($address: ID!) {
      owners(first: 5, where: { id: $address }) {
          ownedTokens {
              id
          }
      }
  }
`;
