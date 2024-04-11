"use client";

import GridSkeleton from "@/components/grid-skeleton";
import PokemonGrid from "@/components/pokemon-grid";
import { Button } from "@/components/ui/button";
import { useGetPokemons } from "@/hooks/use-pokemons";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  const queryParams = useSearchParams();

  const [currentPage, setCurrentPage] = React.useState(() => {
    const page = Number(queryParams.get("page"));
    return Number.isNaN(page) ? 0 : page;
  });
  const { data, isFetching } = useGetPokemons(currentPage);
  const { next, previous, pokemons } = data ?? {};

  function handleChangePage(direction: -1 | 1) {
    return () => {
      setCurrentPage(currentPage + direction);
      const newParams = new URLSearchParams();
      newParams.set("page", String(currentPage + direction));
      if (currentPage === 1 && direction === -1) {
        newParams.delete("page");
      }

      router.replace(`/?${newParams.toString()}`);
    };
  }

  return (
    <main
      className="flex min-h-screen flex-col "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundBlendMode: "overlay",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex gap-2 mb-3 mx-auto">
        <Button
          disabled={!Boolean(previous?.length)}
          onClick={handleChangePage(-1)}
        >
          &lt;
        </Button>
        <Button disabled={!Boolean(next?.length)} onClick={handleChangePage(1)}>
          &gt;
        </Button>
      </div>

      {isFetching ? (
        <GridSkeleton />
      ) : (
        <PokemonGrid pokemons={pokemons ?? []} />
      )}
    </main>
  );
}
