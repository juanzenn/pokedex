"use client";

import GridSkeleton from "@/components/grid-skeleton";
import Pagination from "@/components/pagination";
import PokemonGrid from "@/components/pokemon-grid";
import { usePagination } from "@/hooks/use-pagination";
import { useGetPokemons } from "@/hooks/use-pokemons";
import React from "react";

export default function Home() {
  const [currentPage, handleChangePage] = usePagination();

  const { data, isFetching } = useGetPokemons(currentPage);
  const { next, previous, pokemons } = data ?? {};

  return (
    <>
      {isFetching ? (
        <GridSkeleton />
      ) : (
        <PokemonGrid pokemons={pokemons ?? []} />
      )}

      <Pagination
        handleChangePage={handleChangePage}
        hasNext={Boolean(next?.length)}
        hasPrevious={Boolean(previous?.length)}
      />
    </>
  );
}
