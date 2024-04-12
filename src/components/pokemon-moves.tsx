"use client";

import { useGetPokemonMoves } from "@/hooks/use-pokemons";
import { capitalize, removeHyphen } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { NamedAPIResource, PokemonMove } from "pokenode-ts";
import React from "react";
import PokemonType from "./pokemon-type";
import { DataTable } from "./ui/data-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  moves: PokemonMove[];
  pokemon: string;
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
        physical: "/PhysicalIC_SV.png",
        special: "/SpecialIC_SV.png",
        status: "/StatusIC_SV.png",
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

export default function PokemonMoves({ moves, pokemon }: Props) {
  const { data, isFetching } = useGetPokemonMoves(
    moves.map((m) => m.move.name),
    pokemon
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
          power: move.power ?? 0,
          type: move.type,
          description,
        } satisfies TableRow;
      }) ?? []
    );
  }, [data]);

  return (
    <div className="w-full">
      {isFetching ? (
        <div className="min-h-[560px] flex items-center justify-center bg-primary/80 rounded-2xl">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={tableData} />
      )}
    </div>
  );
}
