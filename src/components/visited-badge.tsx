import { Eye } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  visited: boolean;
};

export default function VisitedBadge({ visited }: Props) {
  return (
    visited && (
      <Tooltip>
        <TooltipTrigger className="cursor-default absolute -top-3 -right-2 border border-yellow-700 bg-yellow-600 p-1 rounded-full">
          <figure>
            <Eye size={16} />
          </figure>
        </TooltipTrigger>
        <TooltipContent
          align="end"
          className="bg-yellow-600 border-yellow-700 py-1 text-sm"
        >
          Visited
        </TooltipContent>
      </Tooltip>
    )
  );
}
