import DropMenu from "./drop-menu";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ChevronDown,
  User,
  Volume2,
  Maximize2,
  Minimize2,
  Moon,
  Headphones,
  Megaphone,
  HelpCircle,
  Video,
} from "lucide-react";
import Modal from "./modal";
import Image from "next/image";
import { cn } from "@/lib/util";

type TopNavItemProps = {
  state: boolean;
  setState: (arg0: string) => void;
  ignoreRef: React.RefObject<HTMLDivElement>;
  setDisplayTimeOut?: (arg0: number) => void;
  enableHide?: boolean;
  setEnableHide?: (arg0: boolean) => void;
  displayTimeOut?: number;
};

type TopNavProps = {
  widgetState: (arg0: string) => void;
  showElement: boolean;
  setDisplayTimeOut: (arg0: number) => void;
  enableHide: boolean;
  setEnableHide: (arg0: boolean) => void;
  displayTimeOut: number;
  mobile: boolean;
};

function Appearance({
  state,
  setState,
  enableHide,
  setEnableHide,
  setDisplayTimeOut,
  displayTimeOut,
  ignoreRef,
}: TopNavItemProps) {
  return (
    <>
      {state ? (
        <Modal
          title={"Appearance Settings"}
          setState={setState}
          name={"appearance"}
          ignoreRef={ignoreRef}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="py-[6px] text-xs text-[#919498]">THEME</span>
              <div className="flex flex-col gap-[6px]">
                <div className="my-[6px] flex items-center justify-between text-sm">
                  <span className="w-[70%]">Dark Mode</span>
                  <span className="rounded-[5px] border border-[#515151] px-[15px] py-[6px]">
                    <Moon className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="py-[6px] text-xs text-[#919498]">
                FOCUS MODE
              </span>
              <div className="flex flex-col gap-[6px]">
                <div className="my-[6px] flex items-center justify-between text-sm">
                  <span className="w-[70%]">Hide Elements</span>
                  <input
                    className={cn(
                      "appearance-none bg-transparent m-0 cursor-pointer min-w-[16px] min-h-[16px] w-[16px] h-[16px] border-[1px] border-[#919498] rounded-[2px] flex justify-center items-center",
                      "before:content-[''] before:bg-tick before:w-full before:h-full",
                      "before:bg-[length:16px_16px] before:scale-0 before:flex before:justify-center before:items-center checked:before:scale-100",
                    )}
                    type="checkbox"
                    defaultChecked={enableHide}
                    onClick={() =>
                      setEnableHide ? setEnableHide(!enableHide) : null
                    }
                  />
                </div>
                <div className="my-[6px] flex items-center justify-between text-sm">
                  <span className="w-[70%]">Hide After (seconds)</span>
                  <input
                    className={cn(
                      "min-h-[30px] w-full flex justify-center rounded-[5px] bg-transparent outline-none border border-[#515151] p-2 text-white text-sm leading-4 placeholder:text-white disabled:cursor-not-allowed",
                      "max-w-[80px] setting-input",
                    )}
                    type="number"
                    min={0}
                    value={displayTimeOut ? displayTimeOut : ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setDisplayTimeOut
                        ? setDisplayTimeOut(
                            parseInt(e.target.value ? e.target.value : "0"),
                          )
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

function Account({ state, setState, ignoreRef }: TopNavItemProps) {
  const { data } = useSession();

  return (
    <>
      {state ? (
        <Modal
          title={"My account"}
          ignoreRef={ignoreRef}
          setState={setState}
          name={"account"}
        >
          <div className="flex flex-col gap-5">
            <div className="mt-[10px] flex h-[45px] w-[45px] overflow-hidden rounded-full">
              <Image
                width={45}
                height={45}
                quality={100}
                src={data?.user?.image as string}
                alt={`${data?.user?.name}'s Image`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Email:</span>
              <span>
                <input
                  className="flex min-h-[30px] w-full justify-center rounded-[5px] border border-[#515151] bg-transparent p-2 text-sm leading-4 text-white outline-none placeholder:text-white disabled:cursor-not-allowed"
                  type="text"
                  placeholder={data?.user?.email as string}
                  disabled
                />
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Name:</span>
              <span>
                <input
                  className="flex min-h-[30px] w-full justify-center rounded-[5px] border border-[#515151] bg-transparent p-2 text-sm leading-4 text-white outline-none placeholder:text-white disabled:cursor-not-allowed"
                  type="text"
                  defaultValue={data?.user?.name as string}
                />
              </span>
            </div>

            <div className="flex py-[6px]">
              <span
                className="cursor-pointer text-sm text-[#919498]"
                onClick={() => signOut()}
              >
                Log out
              </span>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default function TopNav({
  showElement,
  setDisplayTimeOut,
  setEnableHide,
  enableHide,
  displayTimeOut,
  mobile,
}: TopNavProps) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [screenTypeIcon, setScreenTypeIcon] = useState(
    <Maximize2 className="h-[18px] w-[18px]" />,
  );
  const userIconRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { status, data } = useSession();

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        setFullScreen(true);
      } else {
        setFullScreen(false);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        userIconRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        !userIconRef.current.contains(event.target as Node) &&
        (!modalRef.current || !modalRef.current.contains(event.target as Node))
      ) {
        setDropDownOpen(false);
      }
    };

    if (dropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen]);

  useEffect(() => {
    if (fullScreen) {
      setScreenTypeIcon(<Minimize2 className="h-[18px] w-[18px]" />);
      document.body.requestFullscreen();
    } else {
      if (document.fullscreenElement) {
        setScreenTypeIcon(<Maximize2 className="h-[18px] w-[18px]" />);
        document.exitFullscreen();
      }
    }
  }, [fullScreen]);

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);

  const setModals = (modal: string) => {
    switch (modal) {
      case "account":
        setShowAccountModal(!showAccountModal);
        break;
      case "appearance":
        setShowAppearanceModal(!showAppearanceModal);
        break;
      case "stats":
        setShowStatsModal(!showStatsModal);
        break;
      case "room":
        setShowRoomModal(!showRoomModal);
        break;
      default:
    }
  };

  return (
    <>
      <Account
        ignoreRef={modalRef}
        state={showAccountModal}
        setState={setModals}
      />
      <Appearance
        ignoreRef={modalRef}
        state={showAppearanceModal}
        setEnableHide={setEnableHide}
        setDisplayTimeOut={setDisplayTimeOut}
        enableHide={enableHide}
        setState={setModals}
        displayTimeOut={displayTimeOut}
      />
      <div
        className={cn(
          "bg-transparent p-2 flex items-center justify-between h-[56px] text-white z-[1001] mt-0 gap-2 top-nav",
          !showElement && "-mt-[48px]",
        )}
      >
        <div className="noodle-info-section flex h-full items-center justify-between gap-[6px] rounded-[5px] bg-dark px-[6px]">
          <div
            className={cn(
              "bg-transparent flex items-center gap-2 h-full",
              "py-1 px-[9px] text-xs rounded-[5px] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
            )}
          >
            <Headphones className="h-[18px] w-[18px]" />
            {mobile ? "" : "Focus"}
            <ChevronDown className="h-[18px] w-[16px]" />
          </div>

          <span className="before:bottom-0 before:right-0 before:flex before:h-[25px] before:w-[1px] before:border-l before:border-l-[#515151] before:content-['']" />

          <div
            className={cn(
              "bg-transparent flex items-center gap-2 h-full",
              "py-1 px-[9px] text-xs rounded-[5px] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
            )}
            onClick={() => setModals("stats")}
          >
            {mobile ? "" : "4"} 🔥
          </div>

          <span className="before:bottom-0 before:right-0 before:flex before:h-[25px] before:w-[1px] before:border-l before:border-l-[#515151] before:content-['']" />

          <div
            className={cn(
              "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
              "bg-transparent flex items-center gap-2 h-min text-white bg-[#4169E1] py-[6px] px-2",
            )}
            onClick={
              status !== "authenticated" ? () => signIn("google") : () => {}
            }
          >
            🚀{" "}
            {status === "authenticated" && !mobile
              ? "Upgrade"
              : status === "authenticated" && mobile
                ? ""
                : status !== "authenticated"
                  ? "Sign Up"
                  : "Sign Up"}
          </div>
        </div>

        <div className="flex h-full items-center gap-2">
          <div className="room-info flex h-full items-center justify-between gap-[6px] rounded-[5px] bg-dark px-[6px]">
            {status === "authenticated" ? (
              <div className="flex items-center justify-center overflow-hidden rounded-full">
                <Image
                  width={30}
                  height={30}
                  quality={100}
                  src={data?.user?.image as string}
                  alt={`${data?.user?.name}'s Image`}
                />
              </div>
            ) : null}
            <div
              className={cn(
                "py-1 px-[9px] text-xs rounded-[5px] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                "bg-transparent rounded-[3px] p-[6px]",
              )}
            >
              <Video className="h-[18px] w-[18px]" />
            </div>

            <span className="before:bottom-0 before:right-0 before:flex before:h-[25px] before:w-[1px] before:border-l before:border-l-[#515151] before:content-['']" />

            <div
              className={cn(
                "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                "py-[5.6px] px-[8px]",
              )}
              onClick={() => setModals("room")}
            >
              {status === "authenticated" ? `${data?.user?.name}'s` : "My"} Room
              <ChevronDown className="h-[18px] w-[18px]" />
            </div>

            <span className="before:bottom-0 before:right-0 before:flex before:h-[25px] before:w-[1px] before:border-l before:border-l-[#515151] before:content-['']" />

            <div
              className={cn(
                "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                "bg-transparent py-[5.6px] px-[8px]",
              )}
            >
              Invite
            </div>
          </div>

          <div className="flex h-full items-center justify-between gap-[6px] rounded-[5px] bg-dark px-[6px]">
            {mobile ? null : (
              <div
                className={cn(
                  "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                  "bg-transparent rounded-[3px] p-[6px]",
                )}
              >
                <Volume2 className="h-[18px] w-[18px]" />
              </div>
            )}

            <div
              className={cn(
                "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                "bg-transparent rounded-[3px] p-[6px]",
              )}
            >
              <Megaphone className="h-[18px] w-[18px]" />
            </div>

            <div
              className={cn(
                "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                "bg-transparent rounded-[3px] p-[6px]",
              )}
            >
              <HelpCircle className="h-[18px] w-[18px]" />
            </div>

            <div
              className={cn(
                "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                "bg-transparent rounded-[3px] p-[6px]",
              )}
              onClick={() => setFullScreen(!fullScreen)}
            >
              {screenTypeIcon}
            </div>

            <span className="before:bottom-0 before:right-0 before:flex before:h-[25px] before:w-[1px] before:border-l before:border-l-[#515151] before:content-['']" />

            <div
              ref={userIconRef}
              className={cn(
                "py-1 px-[9px] text-xs rounded-[5px] bg-[#3d3e42] hover:bg-[#515151] flex justify-between items-center cursor-pointer text-nowrap h-[calc(100%-12px)]",
                "bg-transparent rounded-[3px] p-[6px]",
              )}
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <User className="h-[18px] w-[18px]" />
              <ChevronDown
                className={cn(
                  dropDownOpen && "-rotate-180",
                  "transition-all",
                  "w-[16px] h-[18px]",
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {dropDownOpen ? (
        <DropMenu
          full={showElement}
          dropDownRef={dropDownRef}
          modalStates={setModals}
        />
      ) : null}
    </>
  );
}
