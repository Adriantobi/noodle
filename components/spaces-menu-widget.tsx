import ShuffleCategoryWrapper from "./shuffle-category-wrapper";

import { useState, useEffect, useRef } from "react";
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
  icon: JSX.Element;
  onClick: () => void;
};

function SocialLink({ href, target, type, icon, onClick }: SocialLinkProps) {
  return href ? (
    <Link
      className="flex gap-[10px] p-[10px] items-center hover:bg-[#515151]"
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
  const [muteIcon, setMuteIcon] = useState(<VolumeX className="w-5 h-5" />);
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
      setMuteIcon(<VolumeX className="w-5 h-5" />);
      setVolume(0);
    } else {
      if (tempVol > 0) {
        if (volumeSliderRef.current)
          volumeSliderRef.current.value = tempVol.toString();
        setVolume(tempVol);
      } else {
        setVolume(50);
      }
      setMuteIcon(<Volume2 className="w-5 h-5" />);
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
        "flex relative flex-row-reverse h-full z-[1003] max-w-fit ml-2",
        !showElement && "h-full",
        !menuState && "hidden",
      )}
    >
      <div
        className="w-fit h-fit flex relative top-[50px] cursor-pointer"
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
          "flex flex-col grow h-[calc(100%-64px)] max-w-[340px] bg-dark rounded-lg text-white relative",
          !showElement && "h-[calc(100%-16px)]",
        )}
      >
        <div className="pt-[5px] flex">
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

        <div className="p-[10px] !pb-0 flex w-full">
          <input
            className="max-h-[30px] w-full flex justify-center rounded-[5px] bg-transparent outline-none border border-[#515151] p-2 text-white text-sm leading-4 placeholder:text-[#757575] disabled:cursor-not-allowed"
            type="text"
            placeholder="🔍 Search space"
          />
        </div>

        <div className="relative mt-[10px] h-[51.71px] overflow-hidden border-b border-b-[#515151] grid flex-shrink-0">
          <span
            className={cn(
              "justify-center absolute left-0 top-[6px] z-50 items-center w-[30px] h-[30px] cursor-pointer rounded-[5px] hover:bg-[#515151]/60",
              leftBlur && "flex",
              !leftBlur && "hidden",
            )}
            onClick={() => carouselLeft()}
          >
            <ArrowLeft className="w-[16px] h-[16px]" />
          </span>
          <span
            className="flex absolute right-0 z-50 justify-center top-[6px] items-center w-[30px] h-[30px] cursor-pointer rounded-[5px] hover:bg-[#515151]/60"
            onClick={() => carouselRight()}
          >
            <ArrowRight className="w-[16px] h-[16px]" />
          </span>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r via-transparent to-dark from-[2%] to-[98%] scale-150 pointer-events-none z-10",
              !leftBlur && "from-transparent",
              leftBlur && "from-dark",
            )}
          />
          <div
            className="flex gap-[10px] h-full flex-col overflow-y-hidden overflow-x-scroll scroll-smooth px-2 pb-[9.71px] hover:pb-0 carousel"
            onScroll={() => {
              if (carouselRef.current) {
                if (carouselRef.current.scrollLeft === 0) {
                  setLeftBlur(false);
                } else setLeftBlur(true);
              }
            }}
            ref={carouselRef}
          >
            <div className="w-fit flex transition h-full">
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

        <div className="flex overflow-y-scroll p-[10px] no-scrollbar grow">
          <div className="flex flex-wrap gap-[10px] w-full h-fit">
            {categorySpaces.map((space) => (
              <div
                key={space.id}
                className="flex gap-[5px] flex-col"
                onClick={() => changeCurrentSpace(space)}
              >
                <span className="w-[155px] h-[80px] hover:scale-[1.025] rounded-lg overflow-hidden flex items-stretch relative justify-center cursor-pointer">
                  <Image
                    src={`https://img.youtube.com/vi/${space.link}/hqdefault.jpg`}
                    alt={space.title}
                    draggable={false}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-cover"
                  />
                  <span
                    className="flex justify-center items-center absolute top-0 right-0 w-[30px] h-[30px]"
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
                <span className="text-xs text-nowrap overflow-ellipsis max-w-[155px] overflow-hidden">
                  {space.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col justify-between py-2 px-4 bg-dark rounded-b-lg shadow-space-info">
          <div className="flex h-full w-full justify-between py-2 px-1">
            <div className="flex flex-col">
              <span className="text-sm text-nowrap overflow-ellipsis max-w-[150px] overflow-hidden">
                {space.title}
              </span>
              <span className="flex gap-[5px] items-center relative">
                <span className="text-xs bg-creator bg-clip-text text-transparent">
                  @{creator.name}
                </span>
                <div
                  className="cursor-pointer flex py-1 hover:bg-[#515151] rounded-[3px]"
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
                    icon={<Instagram className="w-4 h-4" />}
                    onClick={() => setPopup(false)}
                  />
                  <SocialLink
                    href={creator.twitter as string}
                    target="_blank"
                    type="Twitter"
                    icon={<Twitter className="w-4 h-4" />}
                    onClick={() => setPopup(false)}
                  />
                  <SocialLink
                    href={creator.website as string}
                    target="_blank"
                    type="Website"
                    icon={<LinkIcon className="w-4 h-4" />}
                    onClick={() => setPopup(false)}
                  />
                  <SocialLink
                    href={creator.youtube as string}
                    target="_blank"
                    type="Youtube"
                    icon={<Youtube className="w-4 h-4" />}
                    onClick={() => setPopup(false)}
                  />
                </div>
              </span>
            </div>

            <span
              className="py-[6px] px-[10px] min-h-9 min-w-9 cursor-pointer"
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
          <div className="pt-[2px] pl-[6px] pb-[14px] flex w-full items-center">
            <div
              className="flex pl-1 cursor-pointer"
              onClick={() => setMuted(!muted)}
            >
              {muteIcon}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              ref={volumeSliderRef}
              className="w-full volume-slider"
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
