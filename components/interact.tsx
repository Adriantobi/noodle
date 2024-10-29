import TopNav from "./top-nav";
import WidgetNav from "./widget-nav";
import WidgetCanvas from "./widget-canvas";
import { useEffect, useState } from "react";
import BreatheWidget from "./widgets/breathe-widget";
import {
  categoryInterface,
  creatorInterface,
  spaceInterface,
} from "@/types/types";
import SpacesMenuWidget from "./spaces-menu-widget";

type InteractProps = {
  space: spaceInterface;
  creator: creatorInterface;
  categories: categoryInterface[];
  categorySpaces: spaceInterface[];
  changeCurrentSpace: (arg0: spaceInterface) => void;
  setAllSpaceDetails: (arg0: string, arg1?: "increment" | "decrement") => void;
  setIframeVolume: (arg0: number) => void;
};

export default function Interact({
  space,
  creator,
  categories,
  categorySpaces,
  changeCurrentSpace,
  setAllSpaceDetails,
  setIframeVolume,
}: InteractProps) {
  const [showTimer, setShowTimer] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [showSounds, setShowSounds] = useState(false);
  const [showSpaceMenuWidget, setShowSpaceMenuWidget] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [showBreathe, setShowBreathe] = useState(false);
  const [showElement, setShowElement] = useState(true);
  const [displayTimeOut, setDisplayTimeOut] = useState<number>(
    localStorage.getItem("display_options")
      ? JSON.parse(localStorage.getItem("display_options") || "{}")
          .displayTimeOut
      : 30,
  );
  const [enableHide, setEnableHide] = useState<boolean>(
    localStorage.getItem("display_options")
      ? JSON.parse(localStorage.getItem("display_options") || "{}").enableHide
      : true,
  );
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 620) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    resize();
    window.addEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const savedLayout = JSON.parse(
      localStorage.getItem("widget_layout_info") || "{}",
    );
    if (savedLayout) {
      setShowTimer(savedLayout.widget_Timer?.display ?? false);
      setShowTasks(savedLayout.widget_Tasks?.display ?? false);
      setShowNotes(savedLayout.widget_Notes?.display ?? false);
      setShowMedia(savedLayout.widget_Media?.display ?? false);
      setShowSounds(savedLayout.widget_Sounds?.display ?? false);
      setShowSpaceMenuWidget(savedLayout.widget_Spaces?.display ?? false);
      setShowFortune(savedLayout.widget_Fortune?.display ?? false);
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleInteraction = () => {
      clearTimeout(timer);
      setShowElement(true);
      startTimer();
    };

    const startTimer = () => {
      timer = setTimeout(() => {
        if (enableHide) setShowElement(false);
      }, displayTimeOut * 1000);
    };

    startTimer();

    localStorage.setItem(
      "display_options",
      JSON.stringify({ enableHide, displayTimeOut }),
    );

    window.addEventListener("click", handleInteraction);
    window.addEventListener("mousemove", handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
    };
  }, [enableHide, displayTimeOut]);

  const setWidget = (widget: string) => {
    switch (widget) {
      case "timer":
        setShowTimer(!showTimer);
        break;
      case "tasks":
        setShowTasks(!showTasks);
        break;
      case "notes":
        setShowNotes(!showNotes);
        break;
      case "media":
        setShowMedia(!showMedia);
        break;
      case "sounds":
        setShowSounds(!showSounds);
        break;
      case "fortune":
        setShowFortune(!showFortune);
        break;
      case "spaces":
        setShowSpaceMenuWidget(!showSpaceMenuWidget);
        break;
      case "breathe":
        setShowBreathe(!showBreathe);
        break;
      default:
    }
  };

  return (
    <div className="relative z-50 box-border h-full">
      <TopNav
        widgetState={setWidget}
        showElement={showElement}
        setEnableHide={setEnableHide}
        enableHide={enableHide}
        displayTimeOut={displayTimeOut}
        setDisplayTimeOut={setDisplayTimeOut}
        mobile={mobile}
      />
      <div className="relative z-50 flex h-full w-fit">
        <WidgetNav
          widgetState={setWidget}
          states={[
            showTimer,
            showTasks,
            showNotes,
            showMedia,
            showSounds,
            showFortune,
            showSpaceMenuWidget,
            showBreathe,
          ]}
          showElement={showElement}
        />
        <SpacesMenuWidget
          space={space}
          creator={creator}
          categories={categories}
          changeCurrentSpace={changeCurrentSpace}
          categorySpaces={categorySpaces}
          widgetState={setWidget}
          menuState={showSpaceMenuWidget}
          setAllSpaceDetails={setAllSpaceDetails}
          setIframeVolume={setIframeVolume}
          showElement={showElement}
        />
      </div>
      <WidgetCanvas
        states={[
          showTimer,
          showTasks,
          showNotes,
          showMedia,
          showSounds,
          showFortune,
        ]}
        widgetState={setWidget}
        mobile={mobile}
      />
      <BreatheWidget display={showBreathe} widgetState={setWidget} />
    </div>
  );
}
