import WidgetButton from "./widget-button";
import {
  AlarmClock,
  Calendar,
  Globe,
  Music,
  NotepadText,
  PenTool,
  SlidersHorizontal,
  Sparkles,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/util";

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
    <div
      className={cn(
        "flex flex-col gap-2 ml-2 menu-items",
        !showElement && "ml-[-70px]",
      )}
    >
      <div className="flex flex-col py-2 px-[10px] w-[70px] items-center justify-between gap-[10px] bg-dark rounded-lg max-h-[300px]">
        <WidgetButton
          selected={states[6]}
          icon={<Globe className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Spaces"
          currentState={widgetState}
        />
        <WidgetButton
          selected={false}
          icon={
            <SlidersHorizontal
              className="w-[22px] h-[22px]"
              strokeWidth={1.5}
            />
          }
          label="Sounds"
        />
        <WidgetButton
          selected={false}
          icon={<Calendar className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Cal"
        />
      </div>
      <div className="flex flex-col py-2 px-[10px] w-[70px] items-center justify-between gap-[10px] bg-dark rounded-lg max-h-[300px] overflow-y-scroll hover:pr-0 menu-scroll">
        <WidgetButton
          selected={states[1]}
          icon={<PenTool className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Tasks"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[2]}
          icon={<NotepadText className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Notes"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[3]}
          icon={<Music className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Media"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[0]}
          icon={<AlarmClock className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Timer"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[5]}
          icon={<Sparkles className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Fortune"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[7]}
          icon={<Wind className="w-[22px] h-[22px]" strokeWidth={1.5} />}
          label="Breathe"
          currentState={widgetState}
        />
      </div>
    </div>
  );
}
