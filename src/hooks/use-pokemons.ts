import { getPokemon, getPokemons } from "@/lib/poke-api";
import { useQuery } from "@tanstack/react-query";

export function useGetPokemons(page: number = 0) {
  return useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => await getPokemons(page),
    staleTime: 5 * 1000,
  });
}

export function useGetPokemon(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => await getPokemon(name),
    staleTime: 5 * 1000,
  });
}
