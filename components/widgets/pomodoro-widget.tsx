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
        <div className="flex justify-self-center flex-col w-full h-full">
          <div className="flex justify-between px-[15px]">
            <div className="flex text-[54px]">
              <span>20:00</span>
            </div>

            <div className="flex justify-evenly gap-[10px] items-center">
              <div className="flex items-center justify-center h-9 text-[16px] float-right cursor-pointer text-center border-[1.5px] border-white rounded-[10px] w-24">
                Start
              </div>
              <span className="flex justify-center items-center cursor-pointer">
                <RotateCw className="w-[18px] h-[18px]" />
              </span>
            </div>
          </div>

          <div className="flex justify-evenly items-center pb-[10px]">
            <div className="border-b-2 border-b-[#93969a] flex cursor-pointer pb-[10px]">
              Pomodoro
            </div>
            <div className="border-b-2 border-b-[#93969a] flex cursor-pointer pb-[10px]">
              Short Break
            </div>
            <div className="border-b-2 border-b-[#93969a] flex cursor-pointer pb-[10px]">
              Long Break
            </div>
            <span className="flex justify-center items-center cursor-pointer">
              <Settings className="w-[18px] h-[18px]" />
            </span>
          </div>
        </div>
      </Widget>
    </>
  );
}
