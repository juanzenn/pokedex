"use client";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-2 mb-3">
        <Button
          disabled={!Boolean(previous?.length) || isFetching}
          onClick={handleChangePage(-1)}
        >
          &lt;
        </Button>
        <Button
          disabled={!Boolean(next?.length) || isFetching}
          onClick={handleChangePage(1)}
        >
          &gt;
        </Button>
      </div>

      {isFetching && <p>Loading...</p>}

      {pokemons &&
        pokemons.length > 0 &&
        pokemons?.map((pokemon) => <p key={pokemon.id}>{pokemon.name}</p>)}
    </main>
  );
}
