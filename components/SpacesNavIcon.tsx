import Image from "next/image";
import styles from "../css/spacesnavicon.module.css";

type SpacesNavIconProps = {
  showElement: boolean;
  widgetState: (arg0: string) => void;
  currentState: boolean;
};

function BorderedImage({image, state}: {image: string, state: boolean}){
  const width = 90
  const height = width * 9/16

  return (
    <div className={`${styles.spacesIconWrapper} ${state ? `${styles.borderActive}` : ''}`}>
      <Image
        src={image}
        alt="logo"
        width={width}
        height={height}
        className={styles.spaces}
        unoptimized={true}
      />
    </div>
  );
}

export default function SpacesNavIcon({
  showElement,
  currentState,
  widgetState,
}: SpacesNavIconProps) {
  return (
    <div className={styles.SpacesNavIcon}  onClick={() => widgetState("spaces")}>
      <div className={`${styles.spacesNavIconWrapper} ${currentState ? `${styles.active}` : ''}`}>
        <BorderedImage image="/Space1.png" state={currentState} />
        <BorderedImage image="/Space3.png" state={currentState} />
        <BorderedImage image="/Space2.png" state={currentState} />
        <BorderedImage image="/Space4.png" state={currentState} />
      </div>
    </div>
  );
}
