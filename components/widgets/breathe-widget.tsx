import Image from "next/image";
import { X } from "lucide-react";
import { WidgetProps } from "../widget";

export default function BreatheWidget({ display, widgetState }: WidgetProps) {
  return (
    <>
      <div
        className="fixed top-0 overflow-hidden flex h-full w-full z-[1010] flex-col justify-center items-center bg-[#23282e]"
        style={{ display: display ? "flex" : "none" }}
      >
        <span
          className="flex justify-center items-center cursor-pointer absolute top-[20px] right-[20px] py-[6px] px-[15px]"
          onClick={() => widgetState("breathe")}
        >
          <X />
        </span>
        <Image
          src={"https://lifeat.io/6ed030cabcec50a1584a.gif"}
          width={0}
          height={0}
          sizes="100vw"
          className="max-w-[60%] max-h-[60%] w-auto h-auto"
          alt={"Breathe Gif"}
        />
      </div>
    </>
  );
}
