/* 
* CHARACTER PROPS
*
* description: Character props for the application
*/
export type CharacterProps = {
  imageUrl: string;
  name: string;
  sourceUrl?: string;
  films?: string[];
  shortFilms?: string[];
  tvShows?: string[];
  _id?: string;
  updatedAt?: string;
}

// List of Characters model
export interface CharacterModel {
  info: {
      count: number
      nextPage: number | null
      previousPage: number | null
      totalPages: number
  }
  data: CharacterProps[] | CharacterProps
}
