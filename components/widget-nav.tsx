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
      <div className="flex max-h-[300px] w-[70px] flex-col items-center justify-between gap-[10px] rounded-lg bg-dark px-[10px] py-2">
        <WidgetButton
          selected={states[6]}
          icon={<Globe className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Spaces"
          currentState={widgetState}
        />
        <WidgetButton
          selected={false}
          icon={
            <SlidersHorizontal
              className="h-[22px] w-[22px]"
              strokeWidth={1.5}
            />
          }
          label="Sounds"
        />
        <WidgetButton
          selected={false}
          icon={<Calendar className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Cal"
        />
      </div>
      <div className="menu-scroll flex max-h-[300px] w-[70px] flex-col items-center justify-between gap-[10px] overflow-y-scroll rounded-lg bg-dark px-[10px] py-2 hover:pr-0">
        <WidgetButton
          selected={states[1]}
          icon={<PenTool className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Tasks"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[2]}
          icon={<NotepadText className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Notes"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[3]}
          icon={<Music className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Media"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[0]}
          icon={<AlarmClock className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Timer"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[5]}
          icon={<Sparkles className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Fortune"
          currentState={widgetState}
        />
        <WidgetButton
          selected={states[7]}
          icon={<Wind className="h-[22px] w-[22px]" strokeWidth={1.5} />}
          label="Breathe"
          currentState={widgetState}
        />
      </div>
    </div>
  );
}
