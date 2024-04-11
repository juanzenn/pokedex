import { getPokemon, getPokemons } from "@/lib/poke-api";
import { useQuery } from "@tanstack/react-query";

export function useGetPokemons(page: number = 0) {
  return useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => await getPokemons(page),
    staleTime: 5 * 1000,
  });
}

export function useGetPokemon(id: number) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => await getPokemon(id),
    staleTime: 5 * 1000,
  });
}
