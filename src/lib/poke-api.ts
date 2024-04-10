import axios, { AxiosRequestConfig } from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

const endpoints = {
  pokemon: "pokemon",
};

const axiosInstance = axios.create({ baseURL });

const api = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig) =>
    await axiosInstance.get<T>(endpoint, config),
};

// *** TYPES *** //

type Pokemon = {
  id: number;
  name: string;
  height: number;
  order: number;
  weight: number;
  stats: PokemonStat[];
  types: PokemonType[];
};

type PokemonType = {
  slot: number;
  type: {
    id: number;
    name: string;
  };
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    id: number;
    name: string;
  };
};

// *** API CALLS *** //

export async function getPokemons(currentPage: number = 0) {
  const LIMIT = 15;

  const queryParams = new URLSearchParams();

  if (currentPage > 0) {
    queryParams.append("offset", (currentPage * LIMIT).toString());
  }

  const { data } = await api.get<{
    count: number;
    next: string | undefined;
    previous: string | undefined;
    results: { name: string; url: string }[];
  }>(endpoints.pokemon + "?" + queryParams.toString());

  const pokemons = await Promise.all(
    data.results.map(async (pokemon): Promise<Pokemon> => {
      const { data } = await api.get<Pokemon>(pokemon.url);
      return {
        id: data.id,
        name: data.name,
        height: data.height,
        order: data.order,
        weight: data.weight,
        types: data.types,
        stats: data.stats,
      };
    })
  );

  return { pokemons, next: data.next, previous: data.previous };
}
