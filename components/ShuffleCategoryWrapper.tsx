import { useEffect, useRef } from "react";

import styles from "../css/shufflecategorywrapper.module.css";

type CategoryItemProps = {
  category: string;
  src: string;
  setAllSpaceDetails: (arg0: string) => void;
};

type ShuffleCategoryWrapperProps = {
  category: string;
  src: string;
  setAllSpaceDetails: (arg0: string) => void;
};

function CategoryItem({
  category,
  src,
  setAllSpaceDetails,
}: CategoryItemProps) {
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
      className={styles.shuffleCategoryWrapper}
      onClick={() => {
        setAllSpaceDetails(category);
      }}
    >
      <div className={styles.shuffleCategoryButton}>
        <span className={styles.noodleToolTip} ref={toolTipRef}>
          {category}
        </span>
        <picture>
          <img
            className={styles.spaceCategoryIcon}
            src={src}
            alt={`An emoji for ${category.toUpperCase()} space category.`}
          />
        </picture>
      </div>
    </div>
  );
}

export default function ShuffleCategoryWrapper(
  props: ShuffleCategoryWrapperProps,
) {
  return <CategoryItem {...props} />;
}
