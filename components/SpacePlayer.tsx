"use client";

import styles from "../css/spaceplayer.module.css";
import ReactPlayer from "react-player";

type SpacePlayerProps = {
  source: string;
  vol: number;
};

export default function SpacePlayer({ source, vol }: SpacePlayerProps) {
  return (
    <div className={styles.SpacePlayer}>
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
