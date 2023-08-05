import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
    }
  }
`;

export const GET_ANIME_DETAIL = gql`
  query GetAnimeDetail($animeId: Int!) {
    Media(id: $animeId) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
      description
    }
  }
`;
