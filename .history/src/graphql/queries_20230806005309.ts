import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
  query GetAnimeList {
    Page {
      media(perPage: 10) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        averageScore
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
