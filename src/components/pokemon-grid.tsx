import { type Pokemon } from "pokenode-ts";
import PokemonCard from "./pokemon-card";

type PokemonGridPros = {
  pokemons: Pokemon[];
  currentPage?: number;
};

export default function PokemonGrid({
  pokemons,
  currentPage,
}: PokemonGridPros) {
  if (pokemons.length <= 0) {
    return null;
  }

  return (
    <div className="container mx-auto pb-14">
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pokemons.map(({ id, name, sprites: { front_default: image } }) => (
          <PokemonCard
            key={id}
            href={
              `/pokemon/${name}` + (currentPage ? `?page=${currentPage}` : "")
            }
            name={name}
            image={image ?? ""}
          />
        ))}
      </section>
    </div>
  );
}
