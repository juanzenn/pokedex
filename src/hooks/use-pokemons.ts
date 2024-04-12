import {
  evolutionApi,
  getPokemon,
  getPokemons,
  moveApi,
  pokemonApi,
} from "@/lib/poke-api";
import { useQuery } from "@tanstack/react-query";
import { ChainLink } from "pokenode-ts";

export function useGetPokemons(page: number = 0) {
  return useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => await getPokemons(page),
  });
}

export function useGetPokemon(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => await getPokemon(name),
  });
}

export function useGetPokemonType(name: string) {
  return useQuery({
    queryKey: ["type", name],
    queryFn: async () => await pokemonApi.getTypeByName(name),
  });
}

export function useGetPokemonAbility(name: string) {
  return useQuery({
    queryKey: ["ability", name],
    queryFn: async () => await pokemonApi.getAbilityByName(name),
  });
}

export function useGetPokemonMoves(name: string[], pokemon: string) {
  return useQuery({
    queryKey: ["moves", pokemon],
    queryFn: async () => {
      const moves = await Promise.all(
        name.map(async (move) => {
          return await moveApi.getMoveByName(move);
        })
      );

      return moves;
    },
  });
}

export function useGetPokemonEvolutionChain(name: string) {
  return useQuery({
    queryKey: ["evolution", name],
    queryFn: async () => {
      const specie = await pokemonApi.getPokemonSpeciesByName(name);
      const { evolution_chain } = specie;
      const chainId = evolution_chain.url.split("/")[6];
      const { chain } = await evolutionApi.getEvolutionChainById(
        Number(chainId)
      );
      let idx = 0;
      let evolutionsMap = new Map<number, string[]>();

      function parseChainLink(link: ChainLink, index = 0) {
        if (link.evolves_to.length > 0) {
          idx++;
          link.evolves_to.map((next) => parseChainLink(next, idx));
        }

        if (evolutionsMap.get(index)) {
          evolutionsMap.set(index, [
            ...(evolutionsMap.get(index) ?? []),
            ...[link.species.name],
          ]);
        } else {
          evolutionsMap.set(index, [link.species.name]);
        }
      }
      parseChainLink(chain);

      const evolutionSteps = Array.from(evolutionsMap)
        .map(([, value]) => value)
        .reverse();

      return await Promise.all(
        evolutionSteps.map(async (step) => {
          const stepEvolutions = await Promise.all(
            step.map(async (name) => {
              const pokemon = await pokemonApi.getPokemonByName(name);
              return { name, sprite: pokemon.sprites.front_default ?? "" };
            })
          );

          return stepEvolutions;
        })
      );
    },
  });
}
``;
