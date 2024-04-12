import { capitalize, cn, removeHyphen } from "@/lib/utils";
import { PokemonStat } from "pokenode-ts";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  stats: PokemonStat[];
};

export default function PokemonBaseStats({ stats }: Props) {
  function calculateBaseStat(num: number) {
    const MAX = 255;
    return (num * 100) / MAX;
  }

  const sorted = stats.sort((a, b) => a.base_stat - b.base_stat);
  const minStat = sorted[0];
  const maxStat = sorted[stats.length - 1];

  console.log(minStat, maxStat);

  return (
    <div className="">
      {stats.map(({ stat, base_stat }) => (
        <div key={stat.name} className="flex w-full gap-2 items-center">
          <strong className="block w-36 text-sm">
            {capitalize(removeHyphen(stat.name))}:{" "}
          </strong>
          <Tooltip>
            <TooltipTrigger className="flex-1 cursor-default">
              <div className="relative w-full h-2 flex-1 rounded-md bg-primary/90">
                <span
                  className={cn(
                    "absolute left-0 h-full bg-slate-100 rounded-full",
                    minStat.stat.name === stat.name && "bg-blue-400",
                    maxStat.stat.name === stat.name && "bg-orange-400"
                  )}
                  style={{
                    width: `${calculateBaseStat(base_stat)}%`,
                  }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {minStat.stat.name === stat.name
                ? "Lower"
                : maxStat.stat.name === stat.name
                ? "Higher"
                : "N/A"}
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
