import { getPokemons } from "@/lib/poke-api";
import { useQuery } from "@tanstack/react-query";

export function useGetPokemons(page: number = 0) {
  return useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => await getPokemons(page),
  });
}
