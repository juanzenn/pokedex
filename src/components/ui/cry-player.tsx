import { Pause, Play } from "lucide-react";
import React from "react";
import { Button } from "./button";

type Props = {
  source: string;
};

export default function CryPlayer({ source }: Props) {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = React.useState(false);

  const Icon = playing ? Pause : Play;

  return (
    <>
      <audio
        controls
        className="w-full mt-2 hidden"
        ref={audioRef}
        onEnded={() => {
          setPlaying(false);
        }}
      >
        <source src={source} />
      </audio>

      <Button
        className="w-full"
        onClick={() => {
          if (!audioRef.current) return;
          setPlaying(!playing);

          audioRef.current.volume = 0.1;
          if (playing) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
        }}
      >
        <Icon />
      </Button>
    </>
  );
}
