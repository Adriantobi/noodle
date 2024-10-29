import Widget, { WidgetProps } from "../widget";
import { RotateCw } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export default function MediaWidget({
  display,
  widgetState,
  defaultHeight,
  defaultWidth,
}: WidgetProps) {
  const [playlist, setPlaylist] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPlaylist(
      localStorage.getItem("playlist") !== null
        ? localStorage.getItem("playlist")
        : "playlist/3BagbZs5aHeJke8kQqyomJ",
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
          className="h-[calc(100%-38px)] spotify-embed"
          src={`https://open.spotify.com/embed/${playlist}?utm_source=generator`}
          width="100%"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        <div className="flex justify-self-end absolute bottom-0 w-full items-center gap-[10px] h-[38px]">
          <div className="flex w-[calc(100%-100px)] justify-center p-[2px] m-[6px]">
            <input
              type="text"
              className="bg-transparent no-underline text-white min-w-[235px] w-[calc(100%-24px)] text-sm pt-[2px] px-[10px] rounded-lg border-[1.5px] border-[#515151] leading-[25px]"
              ref={inputRef}
              placeholder="Enter Spotify URL here"
              data-tip="Paste a link to YouTube video/playlist, or a Spotify or Apple Music playlist, album, or song, then press 'enter'"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="text-sm cursor-pointer" onClick={handleSubmit}>
            Save
          </div>
          <div
            className="cursor-pointer flex"
            onClick={() => {
              setPlaylist("playlist/3BagbZs5aHeJke8kQqyomJ");
              localStorage.setItem(
                "playlist",
                "playlist/3BagbZs5aHeJke8kQqyomJ",
              );
            }}
          >
            <RotateCw className="w-[18px] h-[18px]" />
          </div>
        </div>
      </Widget>
    </>
  );
}
