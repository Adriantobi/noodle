import Image from "next/image";
import { X } from "lucide-react";
import { WidgetProps } from "../widget";

export default function BreatheWidget({ display, widgetState }: WidgetProps) {
  return (
    <>
      <div
        className="fixed top-0 z-[1010] flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#23282e]"
        style={{ display: display ? "flex" : "none" }}
      >
        <span
          className="absolute right-[20px] top-[20px] flex cursor-pointer items-center justify-center px-[15px] py-[6px]"
          onClick={() => widgetState("breathe")}
        >
          <X />
        </span>
        <Image
          src={"https://lifeat.io/6ed030cabcec50a1584a.gif"}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[60%] w-auto max-w-[60%]"
          alt={"Breathe Gif"}
        />
      </div>
    </>
  );
}
