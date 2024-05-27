import styles from "../css/widgetnav.module.css";

import WidgetButton from "./WidgetButton";
import SpacesNavIcon from "./SpacesNavIcon";
import {
  AlarmClock,
  Calendar,
  ImageIcon,
  Music,
  NotepadText,
  PenTool,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Wind,
} from "lucide-react";
import Image from "next/image";

type SideNavProps = {
  widgetState: (arg0: string) => void;
  states: boolean[];
  showElement: boolean;
};

export default function WidgetNav({
  widgetState,
  states,
  showElement,
}: SideNavProps) {
  return (
    <div className={styles.WidgetNavWrapper}>
      <div
        className={`${styles.WidgetNav} ${!showElement ? `${styles.WidgetNavHidden}` : ""}`}
      >
        <SpacesNavIcon
          showElement={showElement}
          widgetState={widgetState}
          currentState={states[6]}
        />

        <span className={styles.verticalSpacer}></span>

        <div className={styles.wrapper}>
          <WidgetButton selected={false} icon={<Sprout />} label="Deep Work" />
          <WidgetButton
            selected={states[0]}
            icon={<AlarmClock />}
            label="Timer"
            currentState={widgetState}
          />
        </div>

        <span className={styles.verticalSpacer}></span>

        <div className={styles.wrapperScroll}>
          <WidgetButton
            selected={states[1]}
            icon={<PenTool />}
            label="Tasks"
            currentState={widgetState}
          />
          <WidgetButton selected={false} icon={<Calendar />} label="Cal" />
          {/*<WidgetButton
            selected={states[6]}
            icon={<ImageIcon />}
            label="Spaces"
            currentState={widgetState}
          />*/}
          <WidgetButton
            selected={states[2]}
            icon={<NotepadText />}
            label="Notes"
            currentState={widgetState}
          />
          <WidgetButton
            selected={states[3]}
            icon={<Music />}
            label="Media"
            currentState={widgetState}
          />
          <WidgetButton
            selected={states[4]}
            icon={<SlidersHorizontal />}
            label="Sounds"
            currentState={widgetState}
          />
          <WidgetButton
            selected={states[5]}
            icon={<Sparkles />}
            label="Fortune"
            currentState={widgetState}
          />
          <WidgetButton
            selected={states[7]}
            icon={<Wind />}
            label="Breathe"
            currentState={widgetState}
          />
        </div>
      </div>
    </div>
  );
}
