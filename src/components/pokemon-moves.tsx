"use client";

import { useGetPokemonMoves } from "@/hooks/use-pokemons";
import { capitalize, removeHyphen } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { BombIcon, CalendarMinus, IceCream, WavesIcon } from "lucide-react";
import { NamedAPIResource, PokemonMove } from "pokenode-ts";
import React from "react";
import PokemonType from "./pokemon-type";
import { DataTable } from "./ui/data-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  moves: PokemonMove[];
  pokemon: string;
};

const TYPES_COLORS = {
  normal: "150 1% 63%",
  fighting: "24 100% 58%",
  flying: "209 73% 72%",
  poison: "280 58% 50%",
  ground: "23 60% 36%",
  rock: "54 21% 60%",
  bug: "71 54% 42%",
  ghost: "305 31% 34%",
  steel: "194 39% 55%",
  fire: "350 94% 47%",
  water: "215 81% 56%",
  grass: "123 53% 42%",
  electric: "42 94% 60%",
  psychic: "338 90% 58%",
  ice: "191 97% 61%",
  dragon: "238 65% 61%",
  dark: "7 13% 27%",
  fairy: "304 89% 69%",
};

type TableRow = {
  name: string;
  description: string;
  type: NamedAPIResource;
  power: number;
  category: string;
};

const columns: ColumnDef<TableRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (opt) => (
      <strong
        className="line-clamp-1"
        title={capitalize(removeHyphen(opt.getValue<string>()))}
      >
        {capitalize(removeHyphen(opt.getValue<string>()))}
      </strong>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (opt) => (
      <p className="line-clamp-1" title={opt.getValue<string>()}>
        {opt.getValue<string>()}
      </p>
    ),
  },
  {
    accessorKey: "power",
    header: () => <p className="text-center">Power</p>,
    cell: (opt) => {
      const value = Number(opt.getValue<string>());

      return (
        <p className="text-center w-full font-semibold">
          {value <= 0 ? "-" : value}
        </p>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (opt) => {
      const value = opt.getValue<"physical" | "special" | "status">();
      const icons = {
        physical:
          "https://archives.bulbagarden.net/media/upload/b/b4/PhysicalIC_SV.png",
        special:
          "https://archives.bulbagarden.net/media/upload/5/5b/SpecialIC_SV.png",
        status:
          "https://archives.bulbagarden.net/media/upload/e/e0/StatusIC_SV.png",
      };
      const icon = icons[value];

      return (
        <Tooltip>
          <TooltipTrigger className="block w-full cursor-default">
            <figure className="flex items-center justify-center bg-primary py-1 px-2 rounded-md">
              {/* eslint-disable-next-line */}
              <img src={icon} alt={value} width={28} />
            </figure>
          </TooltipTrigger>
          <TooltipContent className="bg-primary">
            {capitalize(value)}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (opt) => {
      return <PokemonType type={opt.getValue<NamedAPIResource>()} />;
    },
  },
];

export default function PokemonMoves({ moves }: Props) {
  const { data } = useGetPokemonMoves(
    moves.map((m) => m.move.name),
    "test"
  );

  const tableData: TableRow[] = React.useMemo(() => {
    return (
      data?.map((move) => {
        const description =
          move.flavor_text_entries.find((m) => m.language.name === "en")
            ?.flavor_text ?? "-";

        return {
          name: move.name,
          category: move.damage_class?.name ?? "",
          description,
          power: move.power ?? 0,
          type: move.type,
        } satisfies TableRow;
      }) ?? []
    );
  }, [data]);

  return (
    <div className="w-full">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
