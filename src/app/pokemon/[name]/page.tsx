"use client";

import { Button } from "@/components/ui/button";
import { useGetPokemon } from "@/hooks/use-pokemons";
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
    <section className="container">
      <div className="bg-primary/70 backdrop-blur-sm p-6 rounded-xl">
        <Button variant="ghost" asChild>
          <Link href="/" className="flex gap-2 font-medium">
            <ChevronLeft size={14} /> Back
          </Link>
        </Button>

        <section className="flex">
          <div className="flex-1"></div>

          <figure className="bg-white w-fit rounded-2xl">
            {/* eslint-disable-next-line */}
            <img src={pokemonImage ?? ""} alt={pokemon?.name} />
          </figure>
        </section>
      </div>
    </section>
  );
}
