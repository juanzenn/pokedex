import React from "react";

export function useVisited(name: string) {
  const [visited, setVisited] = React.useState(() => {
    const pokemonsVisited = window.localStorage.getItem("pokemons");
    if (!pokemonsVisited) return false;

    const parsed: string[] = JSON.parse(pokemonsVisited);
    return Boolean(parsed.find((value) => value === name));
  });

  return [visited, setVisited] as const;
}
