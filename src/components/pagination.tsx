import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  hasPrevious: boolean;
  hasNext: boolean;
  handleChangePage: (direction: -1 | 1) => () => void;
};

export default function Pagination({
  handleChangePage,
  hasNext,
  hasPrevious,
}: Props) {
  return (
    <div className="flex gap-4 mx-auto fixed bottom-6 left-1/2 -translate-x-1/2">
      <Button
        className="w-20"
        disabled={!hasPrevious}
        onClick={handleChangePage(-1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        disabled={!hasNext}
        onClick={handleChangePage(1)}
        className="w-20"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
