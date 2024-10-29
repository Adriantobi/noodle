import { ReactNode } from "react";
import { cn } from "@/lib/util";

type WidgetButtonProps = {
  icon: ReactNode;
  label: string;
  currentState?: (arg0: string) => void;
  selected: boolean;
};

export default function WidgetButton({
  icon,
  label,
  currentState,
  selected,
}: WidgetButtonProps) {
  const handleClick = currentState
    ? () => currentState(label.toLowerCase())
    : undefined;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center max-w-[50px] w-full rounded-lg cursor-pointer p-2 hover:bg-[#515151] gap-[5px]",
        selected && "text-[#e39685] fill-[#e39685]",
      )}
      onClick={handleClick}
    >
      <span className="m-0 p-0 h-5">{icon}</span>
      <span className={cn("select-none text-xs", selected && "text-[#e39685]")}>
        {label}
      </span>
    </div>
  );
}
