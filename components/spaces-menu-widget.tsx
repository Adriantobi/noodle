import ShuffleCategoryWrapper from "./shuffle-category-wrapper";

import { useState, useEffect, useRef, ReactNode } from "react";
import {
  Heart,
  LinkIcon,
  Instagram,
  Twitter,
  Youtube,
  MoreVertical,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  Shuffle,
} from "lucide-react";
import {
  categoryInterface,
  creatorInterface,
  spaceInterface,
} from "@/types/types";
import { cn } from "@/lib/util";
import Image from "next/image";
import Link from "next/link";

type SpacesMenuWidgetProps = {
  space: spaceInterface;
  creator: creatorInterface;
  categories: categoryInterface[];
  categorySpaces: spaceInterface[];
  widgetState: (arg0: string) => void;
  menuState: boolean;
  setAllSpaceDetails: (arg0: string, arg1?: "increment" | "decrement") => void;
  setIframeVolume: (arg0: number) => void;
  showElement: boolean;
  changeCurrentSpace: (arg0: spaceInterface) => void;
};

type SocialLinkProps = {
  href: string;
  target: string;
  type: string;
  icon: ReactNode;
  onClick: () => void;
};

function SocialLink({ href, target, type, icon, onClick }: SocialLinkProps) {
  return href ? (
    <Link
      className="flex items-center gap-[10px] p-[10px] hover:bg-[#515151]"
      href={href}
      target={target}
      onClick={onClick}
    >
      {icon} <span className="text-xs">{type}</span>
    </Link>
  ) : null;
}

export default function SpacesMenuWidget({
  creator,
  space,
  changeCurrentSpace,
  categories,
  categorySpaces,
  widgetState,
  menuState,
  setAllSpaceDetails,
  setIframeVolume,
  showElement,
}: SpacesMenuWidgetProps) {
  const [savedSpaces, setSavedSpaces] = useState<{
    [key: string]: spaceInterface;
  }>(JSON.parse(localStorage.getItem("saved_spaces") || "{}"));
  const [volume, setVolume] = useState(0);
  const [tempVol, setTempVol] = useState(0);
  const [muted, setMuted] = useState(true);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [muteIcon, setMuteIcon] = useState(<VolumeX className="h-5 w-5" />);
  const [leftBlur, setLeftBlur] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popup, setPopup] = useState(false);
  const [topPosition, setTopPosition] = useState<string>("");

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (popupRef.current) {
        const height = popupRef.current.clientHeight;
        setTopPosition(`-${height + 10}px`);
      }
    });

    if (popupRef.current) {
      resizeObserver.observe(popupRef.current);
    }

    return () => {
      if (popupRef.current) {
        resizeObserver.unobserve(popupRef.current);
      }
    };
  }, [popupRef.current]);

  useEffect(() => {
    setIframeVolume(volume);
    if (volume > 0) {
      setTempVol(volume);
      setMuted(false);
    } else {
      setMuted(true);
    }
  }, [volume]);

  useEffect(() => {
    setTempVol(volume);
    if (muted === true) {
      setMuteIcon(<VolumeX className="h-5 w-5" />);
      setVolume(0);
    } else {
      if (tempVol > 0) {
        if (volumeSliderRef.current)
          volumeSliderRef.current.value = tempVol.toString();
        setVolume(tempVol);
      } else {
        setVolume(50);
      }
      setMuteIcon(<Volume2 className="h-5 w-5" />);
    }
  }, [muted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        moreRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !moreRef.current.contains(event.target as Node)
      ) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, moreRef]);

  function saveSpace(space: spaceInterface) {
    const updatedSpaces = { ...savedSpaces };
    if (updatedSpaces[space.id]) {
      delete updatedSpaces[space.id];
    } else {
      updatedSpaces[space.id] = space;
    }
    setSavedSpaces(updatedSpaces);
    localStorage.setItem("saved_spaces", JSON.stringify(updatedSpaces));
  }

  function carouselLeft() {
    if (carouselRef.current && carouselRef.current.scrollLeft > 152) {
      carouselRef.current.scrollTo(carouselRef.current.scrollLeft - 152, 0);
    } else {
      carouselRef.current?.scrollTo(0, 0);
    }
  }

  function carouselRight() {
    if (
      carouselRef.current &&
      carouselRef.current.scrollLeft < carouselRef.current.scrollWidth - 152
    ) {
      carouselRef.current.scrollTo(152 + carouselRef.current.scrollLeft, 0);
    } else {
      carouselRef.current?.scrollTo(carouselRef.current.scrollWidth, 0);
    }
  }

  return (
    <div
      className={cn(
        "flex relative flex-row-reverse h-full z-1003 max-w-fit ml-2",
        !showElement && "h-full",
        !menuState && "hidden",
      )}
    >
      <div
        className="relative top-[50px] flex h-fit w-fit cursor-pointer"
        onClick={() => widgetState("spaces")}
      >
        {menuState ? (
          <svg
            width="26"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0h21a5 5 0 015 5v32a5 5 0 01-5 5H0V0z"
              fill="#3C4551"
            ></path>
            <path
              d="M7.923 21.64a.778.778 0 010-1.28l6.606-4.576a.778.778 0 011.221.639v9.154a.778.778 0 01-1.22.64l-6.607-4.578z"
              fill="#fff"
            ></path>
          </svg>
        ) : (
          <svg
            width="26"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0h21a5 5 0 015 5v32a5 5 0 01-5 5H0V0z"
              fill="#3C4551"
            ></path>
            <path
              d="M17.744 21.64a.778.778 0 000-1.28l-6.607-4.576a.778.778 0 00-1.22.639v9.154c0 .628.704.997 1.22.64l6.607-4.578z"
              fill="#fff"
            ></path>
          </svg>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col grow h-[calc(100%-64px)] w-[340px] max-w-[340px] bg-dark rounded-lg text-white relative",
          !showElement && "h-[calc(100%-16px)]",
        )}
      >
        <div className="flex pt-[5px]">
          <span
            className={cn(
              "py-[6px] px-[15px] text-sm cursor-pointer",
              !favoritesOpen && "border-b-[3px] border-b-white",
            )}
            onClick={() => setFavoritesOpen(false)}
          >
            All Spaces
          </span>
          <span
            className={cn(
              "py-[6px] px-[15px] text-sm cursor-pointer",
              favoritesOpen && "border-b-[3px] border-b-white",
            )}
            onClick={() => setFavoritesOpen(true)}
          >
            Favourites
          </span>
        </div>

        {!favoritesOpen ? (
          <>
            <div className="flex w-full p-[10px] pb-0!">
              <input
                className="flex max-h-[30px] w-full justify-center rounded-[5px] border border-[#515151] bg-transparent p-2 text-sm leading-4 text-white outline-hidden placeholder:text-[#757575] disabled:cursor-not-allowed"
                type="text"
                placeholder="🔍 Search space"
              />
            </div>

            <div className="relative mt-[10px] grid h-[51.71px] shrink-0 border-b border-b-[#515151]">
              <span
                className={cn(
                  "justify-center absolute left-0 top-[6px] z-50 items-center w-[30px] h-[30px] cursor-pointer rounded-[5px] hover:bg-[#515151]/60",
                  leftBlur && "flex",
                  !leftBlur && "hidden",
                )}
                onClick={() => carouselLeft()}
              >
                <ArrowLeft className="h-[16px] w-[16px]" />
              </span>
              <span
                className="absolute right-0 top-[6px] z-50 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[5px] hover:bg-[#515151]/60"
                onClick={() => carouselRight()}
              >
                <ArrowRight className="h-[16px] w-[16px]" />
              </span>
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-r via-transparent to-dark from-[-5%] to-105% pointer-events-none z-10",
                  !leftBlur && "from-transparent",
                  leftBlur && "from-dark",
                )}
              />
              <div
                className="carousel flex h-full flex-col gap-[10px] overflow-y-hidden overflow-x-scroll scroll-smooth px-2 pb-[9.71px] hover:pb-0"
                onScroll={() => {
                  if (carouselRef.current) {
                    if (carouselRef.current.scrollLeft === 0) {
                      setLeftBlur(false);
                    } else setLeftBlur(true);
                  }
                }}
                ref={carouselRef}
              >
                <div className="flex h-full w-fit transition">
                  {categories.map((category) => (
                    <ShuffleCategoryWrapper
                      key={category.id}
                      active={category.name === space.categoryName}
                      category={category.name}
                      setAllSpaceDetails={setAllSpaceDetails}
                      src={category.icon}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="no-scrollbar flex grow overflow-y-scroll p-[10px]">
              <div className="flex h-fit w-full flex-wrap gap-[10px]">
                {categorySpaces.map((space) => (
                  <div
                    key={space.id}
                    className="flex flex-col gap-[5px]"
                    onClick={() => changeCurrentSpace(space)}
                  >
                    <span className="relative flex h-[80px] w-[155px] cursor-pointer items-stretch justify-center overflow-hidden rounded-lg hover:scale-[1.025]">
                      <Image
                        src={`https://img.youtube.com/vi/${space.link}/hqdefault.jpg`}
                        alt={space.title}
                        draggable={false}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full object-cover"
                      />
                      <span
                        className="absolute right-0 top-0 flex h-[30px] w-[30px] items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          saveSpace(space);
                        }}
                      >
                        <Heart
                          className={cn(
                            "w-5 h-5",
                            savedSpaces[space.id] && "fill-white",
                          )}
                          strokeWidth={1.5}
                        />
                      </span>
                    </span>
                    <span className="max-w-[155px] overflow-hidden text-ellipsis text-nowrap text-xs">
                      {space.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(
                "w-full bg-dark p-[10px]",
                Object.values(savedSpaces).length === 0 && "hidden",
                Object.values(savedSpaces).length > 0 && "flex",
              )}
            >
              <div
                className="flex w-full cursor-pointer items-center justify-center gap-[5px] rounded-[5px] bg-white px-[15px] py-[6px]"
                onClick={() => {
                  const spacesArray = Object.values(savedSpaces);
                  const randomIndex = Math.floor(
                    Math.random() * spacesArray.length,
                  );
                  changeCurrentSpace(spacesArray[randomIndex]);
                }}
              >
                <Shuffle className="h-[16px] w-[16px] stroke-black" />
                <span className="text-sm text-black">Shuffle</span>
              </div>
            </div>

            <div className="no-scrollbar flex w-[340px] max-w-[340px] grow overflow-y-scroll p-[10px] pt-0!">
              <div
                className={cn(
                  "h-fit w-full flex-wrap gap-[10px]",
                  Object.values(savedSpaces).length === 0 && "hidden",
                  Object.values(savedSpaces).length > 0 && "flex",
                )}
              >
                {Object.values(savedSpaces).map((space) => (
                  <div
                    key={space.id}
                    className="flex flex-col gap-[5px]"
                    onClick={() => changeCurrentSpace(space)}
                  >
                    <span className="relative flex h-[80px] w-[155px] cursor-pointer items-stretch justify-center overflow-hidden rounded-lg hover:scale-[1.025]">
                      <Image
                        src={`https://img.youtube.com/vi/${space.link}/hqdefault.jpg`}
                        alt={space.title}
                        draggable={false}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full object-cover"
                      />
                      <span
                        className="absolute right-0 top-0 flex h-[30px] w-[30px] items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          saveSpace(space);
                        }}
                      >
                        <Heart
                          className={cn(
                            "w-5 h-5",
                            savedSpaces[space.id] && "fill-white",
                          )}
                          strokeWidth={1.5}
                        />
                      </span>
                    </span>
                    <span className="max-w-[155px] overflow-hidden text-ellipsis text-nowrap text-xs">
                      {space.title}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className={cn(
                  "justify-center items-center w-full h-full gap-[5px]",
                  Object.values(savedSpaces).length === 0 && "flex",
                  Object.values(savedSpaces).length > 0 && "hidden",
                )}
              >
                Press the
                <Heart className="w-5 h-5 fill-[#efa18f] stroke-[#efa18f]" />
                to save a space
              </div>
            </div>
          </>
        )}

        <div className="flex w-full flex-col justify-between rounded-b-lg bg-dark px-4 py-2 shadow-space-info">
          <div className="flex h-full w-full justify-between px-1 py-2">
            <div className="flex flex-col">
              <span className="max-w-[150px] overflow-hidden text-ellipsis text-nowrap text-sm">
                {space.title}
              </span>
              <span className="relative flex items-center gap-[5px]">
                <span className="bg-creator bg-clip-text text-xs text-transparent">
                  @{creator.name}
                </span>
                <div
                  className="flex cursor-pointer rounded-[3px] py-1 hover:bg-[#515151]"
                  ref={moreRef}
                  onClick={() => setPopup(!popup)}
                >
                  <MoreVertical className="h-3 w-3" />
                </div>
                <div
                  className={cn(
                    "absolute h-fit bg-dark min-w-[250px] w-fit rounded-[5px] bottom-0 shadow-floating overflow-hidden",
                    !popup && "hidden",
                    popup && "block",
                  )}
                  ref={popupRef}
                  style={{
                    top: topPosition,
                  }}
                >
                  <SocialLink
                    href={creator.instagram as string}
                    target="_blank"
                    type="Instagram"
                    icon={<Instagram className="h-4 w-4" />}
                    onClick={() => setPopup(false)}
                  />
                  <SocialLink
                    href={creator.twitter as string}
                    target="_blank"
                    type="Twitter"
                    icon={<Twitter className="h-4 w-4" />}
                    onClick={() => setPopup(false)}
                  />
                  <SocialLink
                    href={creator.website as string}
                    target="_blank"
                    type="Website"
                    icon={<LinkIcon className="h-4 w-4" />}
                    onClick={() => setPopup(false)}
                  />
                  <SocialLink
                    href={creator.youtube as string}
                    target="_blank"
                    type="Youtube"
                    icon={<Youtube className="h-4 w-4" />}
                    onClick={() => setPopup(false)}
                  />
                </div>
              </span>
            </div>

            <span
              className="min-h-9 min-w-9 cursor-pointer px-[10px] py-[6px]"
              onClick={() => saveSpace(space)}
            >
              <Heart
                className={cn(
                  "w-5 h-5",
                  savedSpaces[space.id] && "fill-[#efa18f]",
                )}
                stroke="#efa18f"
                strokeWidth={1.5}
              />
            </span>
          </div>
          <div className="flex w-full items-center pb-[14px] pl-[6px] pt-[2px]">
            <div
              className="flex cursor-pointer pl-1"
              onClick={() => setMuted(!muted)}
            >
              {muteIcon}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              ref={volumeSliderRef}
              className="volume-slider w-full"
              value={volume}
              onInput={(e) =>
                setVolume(Number((e.target as HTMLInputElement).value))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
