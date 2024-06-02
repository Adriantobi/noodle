import { Minus } from "lucide-react";
import styles from "../css/widget.module.css";

import React, { useState, useEffect, useRef } from "react";

export type WidgetProps = {
  title?: string;
  resize?: boolean;
  visibleResize?: boolean;
  clear?: boolean;
  display: boolean;
  header?: React.ReactNode;
  widgetState: (arg0: string) => void;
  children?: React.ReactNode;
  defaultHeight?: string;
  defaultWidth?: string;
};

export default function Widget({
  title,
  resize,
  visibleResize,
  clear,
  display,
  header,
  widgetState,
  children,
  defaultHeight,
  defaultWidth,
}: WidgetProps) {
  const savedLayout = JSON.parse(
    localStorage.getItem("widget_layout_info") || "{}",
  );
  const initialPosition = savedLayout[`widget_${title ? title : ""}`]
    ? savedLayout[`widget_${title ? title : ""}`].position
    : { x: 0, y: 0 };
  const [position, setPosition] = useState<{ x: number; y: number }>(
    initialPosition,
  );
  const storedSize = savedLayout[`widget_${title ? title : ""}`]
    ? savedLayout[`widget_${title ? title : ""}`].size
    : { height: 0, width: 0 };
  const [resizeIcon, setResizeIcon] = useState(false);
  const [drag, setDrag] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetHeaderRef = useRef<HTMLDivElement>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    (widgetRef.current as HTMLDivElement).style.top = `${position.y}px`;
    (widgetRef.current as HTMLDivElement).style.left = `${position.x}px`;
    const size = {
      height: (widgetRef.current as HTMLDivElement).getBoundingClientRect()
        .height,
      width: (widgetRef.current as HTMLDivElement).getBoundingClientRect()
        .width,
    };
    const newLayout = {
      ...savedLayout,
      [`widget_${title ? title : ""}`]: {
        position,
        display,
        size: resize ? size : undefined,
      },
    };

    localStorage.setItem("widget_layout_info", JSON.stringify(newLayout));
  }, [position, title, display, savedLayout, resize]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      const movementX =
        "clientX" in event ? event.clientX : event.touches[0].clientX;
      const movementY =
        "clientY" in event ? event.clientY : event.touches[0].clientY;

      const windowRect = (
        (widgetRef.current as HTMLDivElement).parentNode as HTMLElement
      ).getBoundingClientRect();

      const widgetRect = (
        widgetRef.current as HTMLDivElement
      ).getBoundingClientRect();

      if (drag) {
        const newPosX = movementX - windowRect.left - clickPosition.x;
        const newPosY = movementY - windowRect.top - clickPosition.y;

        const minX = 0;
        const minY = 0;
        const maxX = windowRect.width - widgetRect.width;
        const maxY = windowRect.height - widgetRect.height;

        // Adjust position if it exceeds boundaries
        const adjustedX = Math.max(minX, Math.min(newPosX, maxX));
        const adjustedY = Math.max(minY, Math.min(newPosY, maxY));

        setPosition({
          x: adjustedX,
          y: adjustedY,
        });

        (widgetHeaderRef.current as HTMLDivElement).style.cursor = "grabbing";
        document.body.style.cursor = "grabbing";
      } else {
        (widgetHeaderRef.current as HTMLDivElement).style.cursor = "grab";
        document.body.style.cursor = "default";
      }
    };

    const onMouseUp = () => {
      setDrag(false);
      document.body.style.cursor = "default";
      setClickPosition({ x: 0, y: 0 });
      if (widgetHeaderRef.current) {
        (widgetHeaderRef.current as HTMLDivElement).style.cursor = "grab";
      }
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("touchmove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("touchend", onMouseUp);

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("touchmove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("touchend", onMouseUp);
    };
  }, [drag, position, clickPosition]);

  return (
    <div
      ref={widgetRef}
      style={{
        height:
          resize && storedSize?.height
            ? `${storedSize.height}px`
            : defaultHeight
              ? `${defaultHeight}px`
              : "auto",
        width:
          resize && storedSize?.width
            ? `${storedSize.width}px`
            : defaultWidth
              ? `${defaultWidth}px`
              : "",
      }}
      className={`${styles.widget} ${resize ? `${styles.resizable}` : ""} ${clear ? `${styles.transparent}` : ""} ${display ? " " : `${styles.display}`}`}
      onMouseEnter={() => setResizeIcon(!resizeIcon)}
      onMouseMove={() => setResizeIcon(true)}
      onMouseLeave={() => setResizeIcon(!resizeIcon)}
    >
      <div
        ref={widgetHeaderRef}
        className={`${styles.widgetHeader} ${clear ? `${styles.transparent}` : ""}`}
        onMouseDown={(event) => {
          setDrag(true);
          setClickPosition({
            x:
              event.clientX -
              (
                widgetHeaderRef.current as HTMLDivElement
              ).getBoundingClientRect().left,
            y:
              event.clientY -
              (
                widgetHeaderRef.current as HTMLDivElement
              ).getBoundingClientRect().top,
          });
        }}
        onTouchStart={(event) => {
          setDrag(true);
          setClickPosition({
            x:
              event.touches[0].clientX -
              (
                widgetHeaderRef.current as HTMLDivElement
              ).getBoundingClientRect().left,
            y:
              event.touches[0].clientY -
              (
                widgetHeaderRef.current as HTMLDivElement
              ).getBoundingClientRect().top,
          });
        }}
        id={styles.header}
      >
        <div className={styles.widgetTitle}>{header}</div>
        <div
          className={styles.closeWidget}
          onClick={() => widgetState(title ? title.toLowerCase() : "")}
        >
          <Minus />
        </div>
      </div>

      <div className={styles.widgetContent}>{children}</div>

      {(resize && resizeIcon) || visibleResize ? (
        <div
          className={`${styles.resize} ${visibleResize ? `${styles.visibleResize}` : ""}`}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            className="resize-widget-corner"
          >
            <path d="M5.333 11.333a.667.667 0 100-1.333.667.667 0 000 1.333zM8 11.333A.667.667 0 108 10a.667.667 0 000 1.333zM8 8.666a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 6a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 11.333a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 8.666a.667.667 0 100-1.333.667.667 0 000 1.333z"></path>
          </svg>
        </div>
      ) : null}
    </div>
  );
}
