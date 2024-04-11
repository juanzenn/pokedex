"use client";

import { cn, range } from "@/lib/utils";
import React from "react";

export default function GridSkeleton() {
  return (
    <div className="container mx-auto pb-14">
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {range(15).map((id) => (
          <article
            key={id}
            className={cn(
              "flex items-center justify-center flex-col bg-primary/70 backdrop-blur-sm p-4 h-[150px]",
              "border border-white/5 shadow-md rounded-lg",
              "animate-pulse"
            )}
          />
        ))}
      </section>
    </div>
  );
}
