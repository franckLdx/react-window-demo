import { Character } from "../types";

const mapCharacter = (rawCharacter: any): Character => ({
  name: rawCharacter.name,
  height: rawCharacter.height,
  mass: rawCharacter.mass,
  hairColor: rawCharacter.hair_color,
  skinColor: rawCharacter.skin_color,
  eyeColor: rawCharacter.eye_color,
  birthYear: rawCharacter.birth_year,
  gender: rawCharacter.gender,
});

export const loadCharacters = async (pageIndex: number) => {
  const response = await fetch(`https://swapi.co/api/people?page=${pageIndex}`);
  const raw = await response.json();
  return {
    totalCount: raw.count,
    characters: raw.results.map(mapCharacter)
  };
};

export type LoadCharacters = typeof loadCharacters;