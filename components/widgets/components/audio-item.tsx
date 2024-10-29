"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useState, useEffect, useRef } from "react";

type AudioItemProps = {
  name: string;
  source: string;
};

export default function AudioItem({ name, source }: AudioItemProps) {
  const [volume, setVolume] = useState(0);
  const [tempVol, setTempVol] = useState(0);
  const [muted, setMuted] = useState(true);
  const [muteIcon, setMuteIcon] = useState(
    <VolumeX className="w-[20px] h-[20px]" />,
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setTempVol(volume);
    if (muted === true) {
      setMuteIcon(<VolumeX className="w-[20px] h-[20px]" />);
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
      setVolume(0);
    } else {
      if (tempVol > 0) {
        if (audioRef.current) {
          audioRef.current.muted = false;
          audioRef.current.volume = tempVol / 100;
        }
        setVolume(tempVol);
      } else {
        if (audioRef.current) {
          audioRef.current.muted = false;
          setVolume(50);
          audioRef.current.volume = 50 / 100;
        }
      }
      setMuteIcon(<Volume2 className="w-[20px] h-[20px]" />);
    }
  }, [muted]);

  useEffect(() => {
    if (volume > 0) {
      setTempVol(volume);
      setMuted(false);
      if (audioRef.current) {
        audioRef.current.volume = volume / 100;
      }
      setMuteIcon(<Volume2 className="w-[20px] h-[20px]" />);
    } else {
      setMuted(true);
    }
  }, [volume]);

  return (
    <div className="flex gap-[5px] flex-col py-[2px]">
      <div
        className="
        flex w-fit
        "
      >
        {name}
      </div>
      <div
        className="
        flex bg-transparent justify-center items-center w-full
        "
      >
        <div
          className="flex cursor-pointer w-fit h-fit pl-[10px]"
          onClick={() => setMuted(!muted)}
        >
          {muteIcon}
        </div>

        <audio
          autoPlay
          loop
          src={source}
          ref={audioRef}
          className="hidden"
          controls
        />

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          className="w-full, flex h-fit ml-2 overflow-visible bg-transparent outline-none appearance-none"
          onChange={(event) =>
            setVolume(Number((event.target as HTMLInputElement).value))
          }
        />
      </div>
    </div>
  );
}
