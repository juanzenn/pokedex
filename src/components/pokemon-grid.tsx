import { type Pokemon } from "@/lib/poke-api";
import { capitalize, cn } from "@/lib/utils";
import Link from "next/link";

type PokemonGridPros = {
  pokemons: Pokemon[];
};

export default function PokemonGrid({ pokemons }: PokemonGridPros) {
  if (pokemons.length <= 0) {
    return null;
  }

  return (
    <div className="container mx-auto pb-14">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map(({ id, name, sprites: { front_default: image } }) => (
          <Link
            href={`/pokemon/${id}`}
            key={id}
            className={cn(
              "flex items-center justify-center flex-col bg-primary/70 backdrop-blur-sm p-4 h-[150px]",
              "hover:bg-blue-500/10",
              "transition-colors duration-300 ease-in-out cursor-pointer",
              "border border-white/5 shadow-md rounded-lg"
            )}
          >
            <figure className="h-[200px]">
              {/* eslint-disable-next-line */}
              <img src={image} alt={name} height={200} />
            </figure>
            <p className="text-background font-medium tracking-wide">
              {capitalize(name)}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
