import BackToHome from "@/components/back-to-home";
import React from "react";

export default function NotFound() {
  return (
    <section className="container">
      <div className="bg-primary/70 backdrop-blur-sm p-6 rounded-xl h-[93dvh] overflow-auto">
        <BackToHome />

        <div className="h-3/5 flex flex-col items-center justify-center gap-5">
          {/* eslint-disable-next-line */}
          <img
            src="/not-found.jpg"
            width={300}
            className="rounded-md shadow-md"
          />

          <h1 className="font-bold text-4xl">
            This pokemon doesn&apos;t exists!
          </h1>
          <p>
            Sorry, it seems like this pokemon is unavailable. Click{" "}
            <strong>Back</strong> at the top to explore more pokemons.
          </p>
        </div>
      </div>
    </section>
  );
}
