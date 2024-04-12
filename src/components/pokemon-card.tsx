import { useVisited } from "@/hooks/use-visited";
import { capitalize, cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import VisitedBadge from "./visited-badge";

type Props = {
  href: string;
  image: string;
  name: string;
};

export default function PokemonCard({ href, image, name }: Props) {
  const [visited] = useVisited(name);

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center justify-center flex-col bg-primary/70 backdrop-blur-sm p-4 h-[150px]",
        "hover:bg-blue-500/10",
        "transition-colors duration-300 ease-in-out cursor-pointer",
        "border border-white/5 shadow-md rounded-lg",
        visited && "bg-yellow-600/25 hover:bg-yellow-600/15"
      )}
    >
      <VisitedBadge visited={visited} />

      <figure className="h-[200px]">
        {/* eslint-disable-next-line */}
        <img src={image || ""} alt={name} height={200} />
      </figure>
      <p className="text-background font-medium tracking-wide">
        {capitalize(name)}
      </p>
    </Link>
  );
}
