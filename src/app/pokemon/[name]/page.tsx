"use client";

import BackToHome from "@/components/back-to-home";
import PokemonAbility from "@/components/pokemon-ability";
import PokemonMoves from "@/components/pokemon-moves";
import PokemonSprites from "@/components/pokemon-sprites";
import PokemonType from "@/components/pokemon-type";

import { Button } from "@/components/ui/button";
import { useGetPokemon } from "@/hooks/use-pokemons";
import {
  capitalize,
  heightToMeters,
  renderId,
  weightToKilograms,
} from "@/lib/utils";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { name: string };
};

export default function PokemonPage({ params: { name: pokemonName } }: Props) {
  if (pokemonName.length <= 0) notFound();

  const { data: pokemon, isFetching } = useGetPokemon(pokemonName);

  if (!isFetching && !pokemon) notFound();

  const {
    sprites,
    name = "",
    id = 0,
    height = 0,
    weight = 0,
    moves = [],
    types = [],
    abilities = [],
  } = pokemon ?? {};

  const pokemonImage = sprites?.other?.["official-artwork"].front_default;

  return (
    <section className="container">
      <div className="bg-primary/70 backdrop-blur-sm p-6 rounded-xl h-[93dvh] overflow-auto">
        <BackToHome />

        {isFetching ? (
          <p className="flex justify-center gap-2">
            <Loader2 className="animate-spin" size={40} />
          </p>
        ) : (
          <section className="flex flex-col-reverse gap-4 lg:gap-8 lg:flex-row">
            <div className="flex-1 space-y-8">
              <h1 className="font-bold text-4xl md:text-6xl">
                {capitalize(name)} - #{renderId(id)}
              </h1>

              <section>
                <h2 className="font-bold text-2xl mb-4">Moves</h2>
                <PokemonMoves moves={moves} pokemon={name} />
              </section>

              {sprites && (
                <section>
                  <h2 className="font-bold text-2xl mb-4">Sprites</h2>
                  <PokemonSprites sprites={sprites} />
                </section>
              )}

              <section>
                <h2 className="font-bold text-2xl mb-4">Evolution Chain</h2>
              </section>
            </div>

            <aside className="bg-primary/80 rounded-2xl px-6 py-3 border border-primary lg:min-w-[35%] h-fit lg:sticky top-0">
              <p className="font-semibold text-lg text-center mb-2">
                {capitalize(name)}
              </p>

              <figure className="border-b border-primary mb-6 -mx-6 px-6">
                {/* eslint-disable-next-line */}
                <img
                  src={pokemonImage ?? ""}
                  alt={name}
                  className="w-[200px] mx-auto"
                />
              </figure>

              <div className="text-white/90 space-y-2">
                <div>
                  <strong>Height:</strong> {heightToMeters(height)} M
                </div>
                <div>
                  <strong>Weigth:</strong> {weightToKilograms(weight)} KG
                </div>
                <div>
                  <strong>Types:</strong>
                  <section className="flex flex-wrap gap-2 mt-2">
                    {types.map(({ slot, type }) => (
                      <PokemonType key={slot} type={type} />
                    ))}
                  </section>
                </div>
                <div>
                  <strong>Abilities:</strong>
                  <section className="flex flex-wrap gap-2 mt-2">
                    {abilities.map(({ slot, ability, is_hidden }) => (
                      <PokemonAbility
                        key={slot}
                        ability={ability}
                        isHidden={is_hidden}
                      />
                    ))}
                  </section>
                </div>
              </div>
            </aside>
          </section>
        )}
      </div>
    </section>
  );
}
