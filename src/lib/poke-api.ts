import axios, { AxiosRequestConfig } from "axios";
import { PokemonClient, type Pokemon } from "pokenode-ts";
// *** API CALLS *** //
const api = new PokemonClient();

export async function getPokemons(currentPage: number = 0) {
  const LIMIT = 15;
  let offset = 0;

  if (currentPage > 0) {
    offset = currentPage * LIMIT;
  }

  const res = await api.listPokemons(offset, LIMIT);

  const pokemons = await Promise.all(
    res.results.map(async (resource): Promise<Pokemon> => {
      const pokemon = await api.getPokemonByName(resource.name);
      return pokemon;
    })
  );

  return { ...res, pokemons };
}

export async function getPokemon(name: string) {
  const pokemon = await api.getPokemonByName(name);
  return pokemon;
}
