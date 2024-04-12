"use client";

import { useGetPokemonType } from "@/hooks/use-pokemons";
import { capitalize } from "@/lib/utils";
import { NamedAPIResource } from "pokenode-ts";
import React from "react";

type Props = {
  type: NamedAPIResource;
};

const TYPES_COLORS = {
  normal: "150 1% 63%",
  fighting: "24 100% 58%",
  flying: "209 73% 72%",
  poison: "280 58% 50%",
  ground: "23 60% 36%",
  rock: "54 21% 60%",
  bug: "71 54% 42%",
  ghost: "305 31% 34%",
  steel: "194 39% 55%",
  fire: "350 94% 47%",
  water: "215 81% 56%",
  grass: "123 53% 42%",
  electric: "42 94% 60%",
  psychic: "338 90% 58%",
  ice: "191 97% 61%",
  dragon: "238 65% 61%",
  dark: "7 13% 27%",
  fairy: "304 89% 69%",
};

export default function PokemonType({ type }: Props) {
  const { name } = type;
  const { data, isFetching } = useGetPokemonType(name);

  if (isFetching)
    return (
      <div className="w-20 h-8 bg-primary/85 animate-pulse rounded-lg py-[2px] px-4" />
    );

  if (data)
    return (
      <div
        className="text-sm bg-primary/85 border-2 border-primary rounded-lg py-[2px] px-4 flex items-center justify-center shadow-sm font-medium uppercase tracking-tight text-white cursor-default"
        style={
          {
            "--primary": TYPES_COLORS[data.name as keyof typeof TYPES_COLORS],
          } as React.CSSProperties
        }
      >
        {capitalize(data.name)}
      </div>
    );
}
