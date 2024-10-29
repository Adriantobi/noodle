import Widget, { WidgetProps } from "../widget";
import { RotateCw, Settings } from "lucide-react";

export default function PomodoroWidget({ display, widgetState }: WidgetProps) {
  return (
    <>
      <Widget
        title="Timer"
        header="Timer"
        resize={false}
        widgetState={widgetState}
        display={display}
      >
        <div className="flex h-full w-full flex-col justify-self-center">
          <div className="flex justify-between px-[15px]">
            <div className="flex text-[54px]">
              <span>20:00</span>
            </div>

            <div className="flex items-center justify-evenly gap-[10px]">
              <div className="float-right flex h-9 w-24 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-white text-center text-[16px]">
                Start
              </div>
              <span className="flex cursor-pointer items-center justify-center">
                <RotateCw className="h-[18px] w-[18px]" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-evenly pb-[10px]">
            <div className="flex cursor-pointer border-b-2 border-b-[#93969a] pb-[10px]">
              Pomodoro
            </div>
            <div className="flex cursor-pointer border-b-2 border-b-[#93969a] pb-[10px]">
              Short Break
            </div>
            <div className="flex cursor-pointer border-b-2 border-b-[#93969a] pb-[10px]">
              Long Break
            </div>
            <span className="flex cursor-pointer items-center justify-center">
              <Settings className="h-[18px] w-[18px]" />
            </span>
          </div>
        </div>
      </Widget>
    </>
  );
}
