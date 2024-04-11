"use client";

import BackToHome from "@/components/back-to-home";
import PokemonAbility from "@/components/pokemon-ability";
import PokemonMoves from "@/components/pokemon-moves";
import PokemonType from "@/components/pokemon-type";

import { Button } from "@/components/ui/button";
import { useGetPokemon } from "@/hooks/use-pokemons";
import {
  capitalize,
  heightToMeters,
  renderId,
  weightToKilograms,
} from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { name: string };
};

export default function PokemonPage({ params: { name } }: Props) {
  if (name.length <= 0) notFound();

  const { data: pokemon, isFetching } = useGetPokemon(name);

  if (!isFetching && !pokemon) notFound();
  if (isFetching) return <p>Loading...</p>;

  const pokemonImage =
    pokemon?.sprites.other?.["official-artwork"].front_default;

  return (
    pokemon && (
      <section className="container">
        <div className="bg-primary/70 backdrop-blur-sm p-6 rounded-xl">
          <BackToHome />

          <section className="flex flex-col-reverse gap-4 lg:gap-8 lg:flex-row">
            <div className="flex-1 space-y-8">
              <h1 className="font-bold text-4xl md:text-6xl">
                {capitalize(pokemon.name)} - #{renderId(pokemon.id)}
              </h1>

              <section>
                <h2 className="font-bold text-2xl mb-4">Moves</h2>
                <PokemonMoves moves={pokemon.moves} pokemon={pokemon.name} />
              </section>
            </div>

            <div className="bg-primary/80 rounded-2xl px-6 py-3 border border-primary lg:min-w-[35%] h-fit lg:sticky top-4">
              <p className="font-semibold text-lg text-center mb-2">
                {capitalize(pokemon.name)}
              </p>

              <figure className="border-b border-primary mb-6 -mx-6 px-6">
                {/* eslint-disable-next-line */}
                <img
                  src={pokemonImage ?? ""}
                  alt={pokemon?.name}
                  className="w-[200px] mx-auto"
                />
              </figure>

              <div className="text-white/90 space-y-2">
                <div>
                  <strong>Height:</strong> {heightToMeters(pokemon.height)} M
                </div>
                <div>
                  <strong>Weigth:</strong> {weightToKilograms(pokemon.weight)}{" "}
                  KG
                </div>
                <div>
                  <strong>Types:</strong>
                  <section className="flex flex-wrap gap-2 mt-2">
                    {pokemon.types.map(({ slot, type }) => (
                      <PokemonType key={slot} type={type} />
                    ))}
                  </section>
                </div>
                <div>
                  <strong>Abilities:</strong>
                  <section className="flex flex-wrap gap-2 mt-2">
                    {pokemon.abilities.map(({ slot, ability, is_hidden }) => (
                      <PokemonAbility
                        key={slot}
                        ability={ability}
                        isHidden={is_hidden}
                      />
                    ))}
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    )
  );
}
