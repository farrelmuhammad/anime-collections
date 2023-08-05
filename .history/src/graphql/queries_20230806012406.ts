import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
query ($id: Int!) {
    MediaList(id: $id) {
      id
      score
      scoreRaw: score(format: POINT_100)
      progress
      progressVolumes
      repeat
      private
      priority
      notes
      hiddenFromStatusLists
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      updatedAt
      createdAt
      media {
        id
        title {
          userPreferred
        }
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
