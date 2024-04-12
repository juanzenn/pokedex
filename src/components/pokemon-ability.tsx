"use client";

import { useGetPokemonAbility } from "@/hooks/use-pokemons";
import { capitalize, removeHyphen } from "@/lib/utils";
import { EyeOff, Gem } from "lucide-react";
import { NamedAPIResource } from "pokenode-ts";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  ability: NamedAPIResource;
  isHidden: boolean;
};

export default function PokemonAbility({ ability, isHidden }: Props) {
  const { name } = ability;
  const { data, isFetching } = useGetPokemonAbility(name);

  if (isFetching) return <div className="w-20 bg-primary animate-pulse" />;
  // Don't show no-main game abilities
  if (!data?.is_main_series) return null;

  const description =
    data.flavor_text_entries.find((entry) => entry.language.name === "en")
      ?.flavor_text ?? "";

  if (data)
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <div className="text-sm bg-primary/85 border-2 border-primary rounded-lg py-[2px] px-4 flex items-center justify-center shadow-sm font-medium tracking-tight text-white cursor-default">
            {capitalize(removeHyphen(data.name))}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px]">
          {isHidden && (
            <p className="flex items-center gap-2 mb-2">
              <Gem size={16} /> <strong>Hidden Ability</strong>
            </p>
          )}
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    );
}
