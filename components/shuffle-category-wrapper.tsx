import { cn } from "@/lib/util";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type ShuffleCategoryWrapperProps = {
  category: string;
  src: string;
  active: boolean;
  setAllSpaceDetails: (arg0: string, arg1?: "increment" | "decrement") => void;
};

export default function ShuffleCategoryWrapper({
  category,
  src,
  active,
  setAllSpaceDetails,
}: ShuffleCategoryWrapperProps) {
  const toolTipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const showTooltip = (e: MouseEvent) => {
      (toolTipRef.current as HTMLDivElement).style.left =
        e.clientX + (toolTipRef.current as HTMLDivElement).clientWidth + 10 <
        document.body.clientWidth
          ? e.clientX -
            (toolTipRef.current as HTMLDivElement).clientWidth -
            10 +
            "px"
          : document.body.clientWidth +
            5 +
            (toolTipRef.current as HTMLDivElement).clientWidth +
            "px";
      (toolTipRef.current as HTMLDivElement).style.top =
        e.clientY + (toolTipRef.current as HTMLDivElement).clientHeight + 10 <
        document.body.clientHeight
          ? e.clientY - 85 + "px"
          : document.body.clientHeight +
            5 -
            (toolTipRef.current as HTMLDivElement).clientHeight +
            "px";
    };

    (wrapperRef.current as HTMLDivElement).addEventListener(
      "mousemove",
      showTooltip,
    );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "flex justify-center items-center text-center h-[42px] p-[0px] float-left group",
        active && "w-[68px] transition",
        !active && "w-[50px]",
      )}
      onClick={() => {
        if (!active) {
          setAllSpaceDetails(category);
        }
      }}
    >
      <div
        className={cn(
          "h-[40px] bg-dark rounded-[10px] px-[6px] py-[1px] border border-[#515151] cursor-pointer flex justify-center items-center text-center relative",
          active && "w-[58px] transition",
          !active &&
            "w-[40px] group-hover:bg-[#424345] group-hover:border-[#505050]",
        )}
      >
        {active && (
          <div className="absolute left-0 top-0 flex h-full w-full overflow-hidden rounded-[10px] bg-[rgba(29,34,40,0.7)] hover:bg-[rgba(35,41,49,0.7)]">
            <span
              className="flex h-full w-full flex-grow items-center justify-center bg-transparent hover:bg-dark"
              onClick={() => setAllSpaceDetails(category, "decrement")}
            >
              <ChevronLeft className="h-[18px] w-[18px]" />
            </span>
            <span
              className="flex h-full w-full flex-grow items-center justify-center bg-transparent hover:bg-dark"
              onClick={() => setAllSpaceDetails(category, "increment")}
            >
              <ChevronRight className="h-[18px] w-[18px]" />
            </span>
          </div>
        )}
        <span
          className="absolute left-0 top-0 z-[2002] hidden h-[24px] items-center justify-center whitespace-nowrap rounded-[4px] bg-dark px-[8px] py-[4px] text-[14px] text-white shadow-[1px_1px_3px_#1e242b] group-hover:flex"
          ref={toolTipRef}
        >
          {category}
        </span>
        <picture>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="flex h-[20px] w-[20px]"
            src={src}
            alt={`An emoji for ${category.toUpperCase()} space category.`}
          />
        </picture>
      </div>
    </div>
  );
}
