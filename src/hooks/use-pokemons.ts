import { api, getPokemon, getPokemons } from "@/lib/poke-api";
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
    queryFn: async () => await api.getTypeByName(name),
  });
}

export function useGetPokemonAbility(name: string) {
  return useQuery({
    queryKey: ["ability", name],
    queryFn: async () => await api.getAbilityByName(name),
  });
}
