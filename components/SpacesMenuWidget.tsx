import { usePathname } from "next/navigation";
import styles from "../css/spacesmenuwidget.module.css";

import ShuffleCategoryWrapper from "./ShuffleCategoryWrapper";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  LinkIcon,
  Twitter,
  Volume2,
  VolumeX,
  Youtube,
} from "lucide-react";
import {
  categoryInterface,
  creatorInterface,
  spaceInterface,
} from "@/types/types";

type SpacesMenuWidgetProps = {
  spaces: spaceInterface;
  creator: creatorInterface;
  categories: categoryInterface[];
  widgetState: (arg0: string) => void;
  menuState: boolean;
  setAllSpaceDetails: (arg0: string) => void;
  setIframeVolume: (arg0: number) => void;
  showElement: boolean;
};

export default function SpacesMenuWidget({
  spaces,
  creator,
  categories,
  widgetState,
  menuState,
  setAllSpaceDetails,
  setIframeVolume,
  showElement,
}: SpacesMenuWidgetProps) {
  //Close MenuSpaces
  const [copy, setCopy] = useState(false);
  const pathName = usePathname();
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  //Set Volume
  const [volume, setVolume] = useState(0);
  const [tempVol, setTempVol] = useState(0);

  useEffect(() => {
    setIframeVolume(volume);
    if (volume > 0) {
      setTempVol(volume);
      setMuted(false);
    } else {
      setMuted(true);
    }
  }, [volume]);

  //Move Carousel
  function moveCarouselLeft() {
    if (
      (
        document.querySelector(
          `.${styles.spacesCategoryCarousel}`,
        ) as HTMLDivElement
      ).scrollLeft > 252
    ) {
      (
        document.querySelector(
          `.${styles.spacesCategoryCarousel}`,
        ) as HTMLDivElement
      ).scrollTo(252, 0);
    } else {
      (
        document.querySelector(
          `.${styles.spacesCategoryCarousel}`,
        ) as HTMLDivElement
      ).scrollTo(0, 0);
    }
  }

  function moveCarouselRight() {
    if (
      (
        document.querySelector(
          `.${styles.spacesCategoryCarousel}`,
        ) as HTMLDivElement
      ).scrollLeft < 252
    ) {
      (
        document.querySelector(
          `.${styles.spacesCategoryCarousel}`,
        ) as HTMLDivElement
      ).scrollTo(252, 0);
    } else {
      (
        document.querySelector(
          `.${styles.spacesCategoryCarousel}`,
        ) as HTMLDivElement
      ).scrollTo(
        (
          document.querySelector(`.${styles.carouselRow}`) as HTMLDivElement
        ).getBoundingClientRect().width,
        0,
      );
    }
  }

  const [muted, setMuted] = useState(true);
  const [muteIcon, setMuteIcon] = useState(<VolumeX />);

  useEffect(() => {
    setTempVol(volume);
    if (muted === true) {
      setMuteIcon(<VolumeX />);
      setVolume(0);
    } else {
      if (tempVol > 0) {
        (
          document.querySelector(`.${styles.volumeSlider}`) as HTMLInputElement
        ).value = tempVol.toString();
        setVolume(tempVol);
      } else {
        setVolume(50);
      }
      setMuteIcon(<Volume2 />);
    }
  }, [muted]);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (copy) {
      navigator.clipboard.writeText(window.location.href);
      (
        document.querySelector(
          `.${styles.shareSpaceLinkButton}`,
        ) as HTMLDivElement
      ).innerHTML = "Share Space →  Link copied!";
      setInterval(() => {
        (
          document.querySelector(
            `.${styles.shareSpaceLinkButton}`,
          ) as HTMLDivElement
        ).innerHTML = "Share Space →";
        setCopy(false);
      }, 5000);
    }
  }, [copy, spaces.link]);

  return (
    <div
      className={`${styles.SpacesMenuWidgetWrapper}`}
      style={{ display: menuState ? "flex" : "none" }}
    >
      <div className={styles.sideBarIcon} onClick={() => widgetState("spaces")}>
        <svg
          width="26"
          height="42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0h21a5 5 0 015 5v32a5 5 0 01-5 5H0V0z"
            fill="#3C4551"
          ></path>
          <path
            d="M7.923 21.64a.778.778 0 010-1.28l6.606-4.576a.778.778 0 011.221.639v9.154a.778.778 0 01-1.22.64l-6.607-4.578z"
            fill="#fff"
          ></path>
        </svg>
      </div>

      <div className={`${styles.SpacesMenu} ${showElement ? '' : `${styles.full}`}`}>
        <div className={styles.spacesSideBarHeader}>
          <div className={styles.noodleButton}>Search 🔎</div>
          <span className={styles.currentTime}>
            {dateState.toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>

        <div className={styles.shufflerHeader}>
          <div className={styles.shufflerHeaderTitle}>Shuffle Spaces</div>
          <div className={styles.shufflerControls}>
            <div className={styles.shufflerLeft} onClick={moveCarouselLeft}>
              <ChevronLeft />
            </div>
            <div className={styles.shufflerRight} onClick={moveCarouselRight}>
              <ChevronRight />
            </div>
          </div>
        </div>

        <div className={styles.shufflerDescription}>
          Click an emoji multiple times for more content
        </div>

        <div className={styles.spacesCategoryCarousel}>
          <div className={styles.carouselRow}>
            {categories.map((category, index) => {
              if (index % 2 === 0) {
                return (
                  <ShuffleCategoryWrapper
                    category={category.name}
                    setAllSpaceDetails={setAllSpaceDetails}
                    src={category.icon}
                    key={category.id}
                  />
                );
              }
            })}
          </div>
          <div className={styles.carouselRow}>
            {categories.map((category, index) => {
              if (index % 2 !== 0) {
                return (
                  <ShuffleCategoryWrapper
                    category={category.name}
                    setAllSpaceDetails={setAllSpaceDetails}
                    src={category.icon}
                    key={category.id}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className={styles.spacesInfoBlock}>
          <div className={styles.spaceIndicator}>
            <div className={styles.shareSpaceName}>
              <div className={styles.spaceNameText}>{spaces.title}</div>
              <div
                className={styles.shareSpaceLinkButton}
                onClick={() => setCopy(true)}
              >
                Share Space →
              </div>
            </div>

            <div className={styles.spacesOptions}>
              <div
                className={styles.saveSpace}
                onClick={() => setSaved(!saved)}
              >
                <Heart stroke="#d68e7f" fill={saved ? "#d68e7f" : "none"} />
              </div>
              <div className={styles.playlist}>
                <Archive />
              </div>
            </div>
          </div>
          <div className={styles.volumeSettingSection}>
            <div
              className={styles.volumeStateToggle}
              onClick={() => setMuted(!muted)}
            >
              {muteIcon}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              className={styles.volumeSlider}
              onInput={(event) =>
                setVolume(Number((event.target as HTMLInputElement).value))
              }
            />
          </div>
        </div>

        <div className={styles.spaceCreatorInfo}>
          <div className={styles.circleIcon} />
          <div className={styles.creatorTextContent}>
            <div className={styles.creatorUserNameSection}>
              <span className={styles.creatorUserName}>@{creator.name}</span>
              <sup>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="feather feather-verified-icon"
                >
                  <path fill="#fff" d="M1.875 1.875h6.25v6.25h-6.25z"></path>
                  <path
                    fillRule="evenodd"
                    d="M5 10a5 5 0 003.536-8.536 5 5 0 00-7.072 0A5 5 0 005 10zm2.317-5.808a.62.62 0 00.175-.44.63.63 0 00-.183-.437.624.624 0 00-.437-.183.63.63 0 00-.44.175L4.375 5.366l-.808-.808a.62.62 0 00-.44-.175.63.63 0 00-.437.183.624.624 0 00-.183.437.63.63 0 00.175.44l1.25 1.25a.625.625 0 00.884 0l2.5-2.5z"
                    fill="#127fff"
                  ></path>
                </svg>
              </sup>
            </div>
            <div className={styles.creatorLinks}>
              {creator.instagram ? (
                <Link
                  href={creator.instagram}
                  target="_blank"
                  id="instagram"
                  className={styles.socialLinksForCreator}
                >
                  <Instagram />
                </Link>
              ) : null}
              {creator.twitter ? (
                <Link
                  href={creator.twitter}
                  target="_blank"
                  id="twitter"
                  className={styles.socialLinksForCreator}
                >
                  <Twitter />
                </Link>
              ) : null}
              {creator.website ? (
                <Link
                  href={creator.website}
                  target="_blank"
                  id="website"
                  className={styles.socialLinksForCreator}
                >
                  <LinkIcon />
                </Link>
              ) : null}
              {creator.youtube ? (
                <Link
                  href={creator.youtube}
                  target="_blank"
                  id="youtube"
                  className={styles.socialLinksForCreator}
                >
                  <Youtube />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.spacesSideBarContent} />

        <div className={styles.spacesSideBarFooterButtons}>
          <div className={`${styles.desktopApp} ${styles.noodleInfoButton}`}>
            <Link href="#" target="_blank">
              Desktop App
            </Link>
          </div>
          <div
            className={`${styles.showCaseButton} ${styles.noodleInfoButton}`}
          >
            <Link href="#" target="_blank">
              Showcase
            </Link>
          </div>
          <div className={`${styles.faqLinkButton} ${styles.noodleInfoButton}`}>
            <Link href="#" target="_blank">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
