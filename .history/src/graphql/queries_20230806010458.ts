import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
query (id: $15125) {
    Media (id: $15125, type: ANIME) {
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
