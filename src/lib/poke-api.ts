import {
  EvolutionClient,
  MoveClient,
  PokemonClient,
  type Pokemon,
} from "pokenode-ts";

// *** API CALLS *** //
export const pokemonApi = new PokemonClient();
export const moveApi = new MoveClient();
export const evolutionApi = new EvolutionClient();

type PokemonWithCries = Pokemon & {
  cries: { latest: string; legacy: string | undefined };
};

export async function getPokemons(currentPage: number = 0) {
  const LIMIT = 15;
  let offset = 0;

  if (currentPage > 0) {
    offset = currentPage * LIMIT;
  }

  const res = await pokemonApi.listPokemons(offset, LIMIT);

  const pokemons = await Promise.all(
    res.results.map(async (resource) => {
      const pokemon = await pokemonApi.getPokemonByName(resource.name);
      return pokemon;
    })
  );

  return { ...res, pokemons };
}

export async function getPokemon(name: string) {
  const pokemon = await pokemonApi.getPokemonByName(name);
  return pokemon as PokemonWithCries;
}
