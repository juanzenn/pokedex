"use client";

import GridSkeleton from "@/components/grid-skeleton";
import Pagination from "@/components/pagination";
import PokemonGrid from "@/components/pokemon-grid";
import { usePagination } from "@/hooks/use-pagination";
import { useGetPokemons } from "@/hooks/use-pokemons";
import React from "react";

const BACKGROUND_URL =
  "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

export default function Home() {
  const [currentPage, handleChangePage] = usePagination();

  const { data, isFetching } = useGetPokemons(currentPage);
  const { next, previous, pokemons } = data ?? {};

  return (
    <main
      className="flex min-h-screen flex-col py-8 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: BACKGROUND_URL }}
    >
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
    </main>
  );
}
