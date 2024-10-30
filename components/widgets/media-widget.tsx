import Widget, { WidgetProps } from "../widget";
import { RotateCw } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export default function MediaWidget({
  display,
  widgetState,
  defaultHeight,
  defaultWidth,
}: WidgetProps) {
  const defaultPlaylist = "playlist/5DN4WqG6OPggVLT17TyoZs";
  const [playlist, setPlaylist] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPlaylist(
      localStorage.getItem("playlist") !== null
        ? localStorage.getItem("playlist")
        : defaultPlaylist,
    );
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === "Enter" &&
      inputRef.current &&
      inputRef.current.value !== ""
    ) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      const playlistId = inputRef.current.value.replace(
        "https://open.spotify.com/",
        "",
      );
      setPlaylist(playlistId);
      inputRef.current.value = "";
      localStorage.setItem("playlist", playlistId);
    }
  };

  return (
    <>
      <Widget
        title="Media"
        header="Media"
        resize={true}
        widgetState={widgetState}
        display={display}
        defaultHeight={defaultHeight}
        defaultWidth={defaultWidth}
      >
        <iframe
          style={{
            borderRadius: "12px",
            width: "100%",
            backgroundColor: "rgb(35, 42, 49)",
          }}
          className="spotify-embed h-[calc(100%-38px)]"
          src={`https://open.spotify.com/embed/${playlist}?utm_source=generator`}
          width="100%"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Embed"
        ></iframe>

        <div className="absolute bottom-0 flex h-[38px] w-full items-center gap-[10px] justify-self-end">
          <div className="m-[6px] flex w-[calc(100%-100px)] justify-center p-[2px]">
            <input
              type="text"
              className="w-[calc(100%-24px)] min-w-[235px] rounded-lg border-[1.5px] border-[#515151] bg-transparent px-[10px] pt-[2px] text-sm leading-[25px] text-white no-underline"
              ref={inputRef}
              placeholder="Enter Spotify URL here"
              data-tip="Paste a link to YouTube video/playlist, or a Spotify or Apple Music playlist, album, or song, then press 'enter'"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="cursor-pointer text-sm" onClick={handleSubmit}>
            Save
          </div>
          <div
            className="flex cursor-pointer"
            onClick={() => {
              setPlaylist(defaultPlaylist);
              localStorage.setItem("playlist", defaultPlaylist);
            }}
          >
            <RotateCw className="h-[18px] w-[18px]" />
          </div>
        </div>
      </Widget>
    </>
  );
}
