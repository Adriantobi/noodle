import styles from "../css/interact.module.css";

import TopNav from "./TopNav";
import WidgetNav from "./WidgetNav";
import WidgetCanvas from "./WidgetCanvas";
import { useEffect, useRef, useState } from "react";
import BreatheWidget from "./widgets/BreatheWidget";
import {
  categoryInterface,
  creatorInterface,
  spaceInterface,
} from "@/types/types";
import SpacesMenuWidget from "./SpacesMenuWidget";

type InteractProps = {
  spaces: spaceInterface;
  creator: creatorInterface;
  categories: categoryInterface[];
  setAllSpaceDetails: (arg0: string) => void;
  setIframeVolume: (arg0: number) => void;
};

export default function Interact({
  spaces,
  creator,
  categories,
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
  const [displayTimeOut, setDisplayTimeOut] = useState<number>(5);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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
    if (showElement) {
      timerRef.current = setTimeout(() => {
        setShowElement(false);
      }, displayTimeOut * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showElement, displayTimeOut]);

  useEffect(() => {
    window.addEventListener("click", () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setShowElement(true);
    });

    window.addEventListener("mousemove", () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setShowElement(true);
    });

    return () => {
      window.removeEventListener("click", () => setShowElement(true));
      window.removeEventListener("mousemove", () => setShowElement(true));
    };
  }, []);

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
    <div className={styles.Interact}>
      <TopNav widgetState={setWidget} showElement={showElement} />
      <SpacesMenuWidget
        spaces={spaces}
        creator={creator}
        categories={categories}
        widgetState={setWidget}
        menuState={showSpaceMenuWidget}
        setAllSpaceDetails={setAllSpaceDetails}
        setIframeVolume={setIframeVolume}
      />
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
      />
      <BreatheWidget display={showBreathe} widgetState={setWidget} />
    </div>
  );
}
