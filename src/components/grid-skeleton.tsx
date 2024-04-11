"use client";

import { range } from "@/lib/utils";
import React from "react";

export default function GridSkeleton() {
  return (
    <div className="container mx-auto pb-14">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {range(20).map((id) => (
          <article
            key={id}
            className="flex items-center justify-center flex-col bg-primary/50 backdrop-blur-xl rounded-lg p-4 border border-primary/20 shadow-md h-[150px] animate-pulse"
          />
        ))}
      </section>
    </div>
  );
}
