import { PokemonSprites } from "pokenode-ts";
import React from "react";

type Props = {
  sprites: PokemonSprites;
};

export default function PokemonSprites({ sprites }: Props) {
  const {
    front_default,
    front_female,
    back_default,
    back_female,
    front_shiny,
    back_shiny,
    back_shiny_female,
    front_shiny_female,
  } = sprites;

  return (
    <div className="mx-auto w-fit space-y-6">
      <section className="flex items-center gap-2">
        {(front_default || back_default) && (
          <div>
            <p className="text-center font-semibold mb-2">Default</p>
            <div className="flex gap-4">
              <SpriteContainer
                url={front_default}
                alt="Pokemon's Front (default)"
              />
              <SpriteContainer
                url={back_default}
                alt="Pokemon's Back (default)"
              />
            </div>
          </div>
        )}

        {(front_female || back_female) && (
          <div>
            <p className="text-center font-semibold mb-2">Default (Female)</p>
            <div className="flex gap-4">
              <SpriteContainer
                url={front_female}
                alt="Pokemon's Front (female)"
              />
              <SpriteContainer
                url={back_female}
                alt="Pokemon's Back (female)"
              />
            </div>
          </div>
        )}
      </section>

      <section className="flex items-center gap-2">
        {(front_shiny || back_shiny) && (
          <div>
            <p className="text-center font-semibold mb-2">Shiny</p>
            <div className="flex gap-4">
              <SpriteContainer
                url={front_shiny}
                alt="Pokemon's Front (default, shiny)"
              />
              <SpriteContainer
                url={back_shiny}
                alt="Pokemon's Back (default, shiny)"
              />
            </div>
          </div>
        )}

        {(front_shiny_female || back_shiny_female) && (
          <div>
            <p className="text-center font-semibold mb-2">Shiny (Female)</p>
            <div className="flex gap-4">
              <SpriteContainer
                url={front_shiny_female}
                alt="Pokemon's Front (female, shiny)"
              />
              <SpriteContainer
                url={back_shiny_female}
                alt="Pokemon's Back (female, shiny)"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function SpriteContainer({ url, alt }: { alt: string; url: string | null }) {
  if (!url?.length) return null;

  return (
    <figure>
      {/* eslint-disable-next-line */}
      <img src={url} alt={alt} />
    </figure>
  );
}
