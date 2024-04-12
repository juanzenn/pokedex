import { useGetPokemonEvolutionChain } from "@/hooks/use-pokemons";
import { capitalize, cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = { name: string };

export default function PokemonEvolutions({ name }: Props) {
  const searchParams = useSearchParams();
  const previousPage = searchParams.get("page");

  const { data: step = [] } = useGetPokemonEvolutionChain(name);
  const lastIndex = step.length - 1;

  return (
    <section className="flex flex-col lg:flex-row gap-2 mx-auto w-fit">
      {step.map((currentStep, index) => (
        <section
          key={index}
          className="flex flex-col lg:flex-row items-center gap-2"
        >
          <section className="grid grid-cols-2 gap-2">
            {currentStep.map(({ name, sprite }) => (
              <Link
                key={name}
                href={`/pokemon/${name}${
                  previousPage ? `?page=${previousPage}` : ""
                }`}
                className={cn(
                  "flex justify-center flex-col hover:bg-primary/50 hover:shadow-md rounded-md px-2 transition-all duration-200 pb-2",
                  currentStep.length === 1 && "col-span-2"
                )}
              >
                {/* eslint-disable-next-line */}
                <img src={sprite} alt={name} />
                <p className="text-center font-semibold text-lg">
                  {capitalize(name)}
                </p>
              </Link>
            ))}
          </section>

          <span className="hidden lg:block">
            {index < lastIndex && <ChevronRight />}
          </span>
          <span className="lg:hidden block">
            {index < lastIndex && <ChevronDown />}
          </span>
        </section>
      ))}
    </section>
  );
}
