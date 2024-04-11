import { getPokemon, getPokemons, moveApi, pokemonApi } from "@/lib/poke-api";
import { useQuery } from "@tanstack/react-query";

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
