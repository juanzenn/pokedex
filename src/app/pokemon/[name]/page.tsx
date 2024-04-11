"use client";

import PokemonAbility from "@/components/pokemon-ability";
import PokemonType from "@/components/pokemon-type";

import { Button } from "@/components/ui/button";
import { useGetPokemon } from "@/hooks/use-pokemons";
import { capitalize, heightToMeters, weightToKilograms } from "@/lib/utils";
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
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/" className="flex gap-2 font-medium">
              <ChevronLeft size={14} /> Back
            </Link>
          </Button>

          <section className="flex">
            <div className="flex-1">
              <h1 className="font-bold text-4xl md:text-6xl">
                {capitalize(pokemon.name)}
              </h1>
            </div>

            <div className="bg-primary/60 rounded-2xl px-6 py-3 border border-primary">
              <p className="font-semibold text-lg text-center mb-2">
                {capitalize(pokemon.name)}
              </p>

              <figure className="border-b border-primary mb-6 -mx-6 px-6">
                {/* eslint-disable-next-line */}
                <img
                  src={pokemonImage ?? ""}
                  alt={pokemon?.name}
                  className="w-[200px]"
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
