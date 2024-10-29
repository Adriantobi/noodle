"use client";

import ReactPlayer from "react-player";

type SpacePlayerProps = {
  source: string;
  vol: number;
};

export default function SpacePlayer({ source, vol }: SpacePlayerProps) {
  return (
    <div className="absolute flex pb-[56.25%] pt-[25px] w-[200%] left-[-100%] pointer-events-none space-player">
      <ReactPlayer
        url={`https://youtube.com/watch?v=${source}`}
        loop={true}
        controls={false}
        playing={true}
        volume={vol / 100}
        muted={vol / 100 > 0 ? false : true}
        config={{
          youtube: {
            playerVars: {
              start: 40,
            },
          },
        }}
      />
    </div>
  );
}
