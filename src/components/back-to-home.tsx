"use client";

import { usePagination } from "@/hooks/use-pagination";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function BackToHome() {
  const [currentPage] = usePagination();

  function getHomepageLink() {
    return "/" + (currentPage > 0 ? `?page=${currentPage}` : "");
  }

  return (
    <Button className="mb-6 sticky top-4 shadow-md z-10" asChild>
      <Link href={getHomepageLink()} className="flex gap-2 font-medium">
        <ChevronLeft size={14} /> Back
      </Link>
    </Button>
  );
}
