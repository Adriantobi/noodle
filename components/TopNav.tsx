import styles from "../css/topnav.module.css";
import account from "../css/modal/account.module.css";
import appearance from "../css/modal/appearance.module.css";
import check from "../css/widgets/components/taskitem.module.css";

import DropMenu from "./DropMenu";

import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ChevronDown,
  Sidebar,
  User,
  Volume2,
  Maximize2,
  Minimize2,
  Moon,
  Headphones,
  Megaphone,
  HelpCircle,
  Video,
} from "lucide-react";
import Modal from "./Modal";
import Image from "next/image";

type TopNavItemProps = {
  state: boolean;
  setState: (arg0: string) => void;
  ignoreRef: React.RefObject<HTMLDivElement>;
  setDisplayTimeOut?: (arg0: number) => void;
  enableHide?: boolean;
  setEnableHide?: (arg0: boolean) => void;
  displayTimeOut?: number;
};

type TopNavProps = {
  widgetState: (arg0: string) => void;
  showElement: boolean;
  setDisplayTimeOut: (arg0: number) => void;
  enableHide: boolean;
  setEnableHide: (arg0: boolean) => void;
  displayTimeOut: number;
  mobile: boolean;
};

function Appearance({
  state,
  setState,
  enableHide,
  setEnableHide,
  setDisplayTimeOut,
  displayTimeOut,
  ignoreRef,
}: TopNavItemProps) {
  return (
    <>
      {state ? (
        <Modal
          title={"Appearance Settings"}
          setState={setState}
          name={"appearance"}
          ignoreRef={ignoreRef}
        >
          <div className={appearance.appearanceSettings}>
            <div className={appearance.settingSection}>
              <span className={appearance.sectionTitle}>THEME</span>
              <div className={appearance.optionsWrapper}>
                <div className={appearance.sectionOption}>
                  <span className={appearance.optionTitle}>Dark Mode</span>
                  <span className={appearance.themeButton}>
                    <Moon />
                  </span>
                </div>
              </div>
            </div>
            <div className={appearance.settingSection}>
              <span className={appearance.sectionTitle}>FOCUS MODE</span>
              <div className={appearance.optionsWrapper}>
                <div className={appearance.sectionOption}>
                  <span className={appearance.optionTitle}>Hide Elements</span>
                  <input
                    className={check.itemCheckBox}
                    type="checkbox"
                    defaultChecked={enableHide}
                    onClick={() =>
                      setEnableHide ? setEnableHide(!enableHide) : null
                    }
                  />
                </div>
                <div className={appearance.sectionOption}>
                  <span className={appearance.optionTitle}>
                    Hide After (seconds)
                  </span>
                  <input
                    className={`${account.settingInput} ${appearance.settingInput}`}
                    type="number"
                    value={displayTimeOut ? displayTimeOut : ""}
                    onChange={(e: any) =>
                      setDisplayTimeOut
                        ? setDisplayTimeOut(
                            parseInt(e.target.value ? e.target.value : 0),
                          )
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

function Account({ state, setState, ignoreRef }: TopNavItemProps) {
  const { data } = useSession();

  return (
    <>
      {state ? (
        <Modal
          title={"My account"}
          ignoreRef={ignoreRef}
          setState={setState}
          name={"account"}
        >
          <div className={account.userOptions}>
            <div className={account.userImageWrapper}>
              <Image
                width={45}
                height={45}
                quality={100}
                src={data?.user?.image!}
                alt={`${data?.user?.name}'s Image`}
              />
            </div>
            <div className={account.userSetting}>
              <span className={account.settingLabel}>Email:</span>
              <span>
                <input
                  className={account.settingInput}
                  type="text"
                  placeholder={data?.user?.email!}
                  disabled
                />
              </span>
            </div>
            <div className={account.userSetting}>
              <span className={account.settingLabel}>Name:</span>
              <span>
                <input
                  className={account.settingInput}
                  type="text"
                  defaultValue={data?.user?.name!}
                />
              </span>
            </div>

            <div className={account.accountAction}>
              <span className={account.logOut} onClick={() => signOut()}>
                Log out
              </span>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default function TopNav({
  widgetState,
  showElement,
  setDisplayTimeOut,
  setEnableHide,
  enableHide,
  displayTimeOut,
  mobile,
}: TopNavProps) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [screenTypeIcon, setScreenTypeIcon] = useState(<Maximize2 />);
  const userIconRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { status, data } = useSession();

  useEffect(() => {
    document.addEventListener("fullscreenchange", (event) => {
      if (document.fullscreenElement) {
        setFullScreen(true);
      } else {
        setFullScreen(false);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        userIconRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        !userIconRef.current.contains(event.target as Node) &&
        (!modalRef.current || !modalRef.current.contains(event.target as Node))
      ) {
        setDropDownOpen(false);
      }
    };

    if (dropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen]);

  useEffect(() => {
    if (fullScreen) {
      setScreenTypeIcon(<Minimize2 />);
      document.body.requestFullscreen();
    } else {
      if (document.fullscreenElement) {
        setScreenTypeIcon(<Maximize2 />);
        document.exitFullscreen();
      }
    }
  }, [fullScreen]);

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);

  const setModals = (modal: string) => {
    switch (modal) {
      case "account":
        setShowAccountModal(!showAccountModal);
        break;
      case "appearance":
        setShowAppearanceModal(!showAppearanceModal);
        break;
      case "stats":
        setShowStatsModal(!showStatsModal);
        break;
      case "room":
        setShowRoomModal(!showRoomModal);
        break;
      default:
    }
  };

  return (
    <>
      <Account
        ignoreRef={modalRef}
        state={showAccountModal}
        setState={setModals}
      />
      <Appearance
        ignoreRef={modalRef}
        state={showAppearanceModal}
        setEnableHide={setEnableHide}
        setDisplayTimeOut={setDisplayTimeOut}
        enableHide={enableHide}
        setState={setModals}
        displayTimeOut={displayTimeOut}
      />
      <div
        className={`${styles.TopNav} ${!showElement ? `${styles.TopNavHidden}` : ""}`}
      >
        <div className={styles.noodleInfoSection}>
          <div className={`${styles.roomsToggle} ${styles.noodleTopNavButton}`}>
            <Headphones />
            {mobile ? "" : "Focus"}
            <ChevronDown />
          </div>

          <span className={styles.verticalSpacer} />

          <div
            className={`${styles.userMetrics} ${styles.noodleTopNavButton}`}
            onClick={() => setModals("stats")}
          >
            {mobile ? "" : "4"} 🔥
          </div>

          <span className={styles.verticalSpacer} />

          <div
            className={`${styles.upgradeButton} ${styles.noodleTopNavButton}`}
            onClick={
              status !== "authenticated" ? () => signIn("google") : () => {}
            }
          >
            🚀{" "}
            {status === "authenticated" && !mobile
              ? "Upgrade"
              : status === "authenticated" && mobile
                ? ""
                : status !== "authenticated"
                  ? "Sign Up"
                  : "Sign Up"}
          </div>
          {mobile ? null : (
            <div
              className={`${styles.sideNavToggle} ${styles.noodleTopNavButton}`}
              onClick={() => widgetState("spaces")}
            >
              <Sidebar />
            </div>
          )}
        </div>

        <div className={styles.topNavRight}>
          <div className={styles.roomInfo}>
            {status === "authenticated" ? (
              <div className={styles.userAccount}>
                <Image
                  width={30}
                  height={30}
                  quality={100}
                  src={data?.user?.image!}
                  alt={`${data?.user?.name}'s Image`}
                />
              </div>
            ) : null}
            <div
              className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}
            >
              <Video />
            </div>

            <span className={styles.verticalSpacer} />

            <div
              className={`${styles.roomName} ${styles.noodleTopNavButton}`}
              onClick={() => setModals("room")}
            >
              {status === "authenticated" ? `${data?.user?.name}'s` : "My"} Room
              <ChevronDown />
            </div>

            <span className={styles.verticalSpacer} />

            <div className={`${styles.invite} ${styles.noodleTopNavButton}`}>
              Invite
            </div>
          </div>

          <div className={styles.roomSettings}>
            {mobile ? null : (
              <div
                className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}
              >
                <Volume2 />
              </div>
            )}

            <div
              className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}
            >
              <Megaphone />
            </div>

            <div
              className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}
            >
              <HelpCircle />
            </div>

            <div
              className={`${styles.settingsButton} ${styles.noodleTopNavButton} ${styles.minimise}`}
              onClick={() => setFullScreen(!fullScreen)}
            >
              {screenTypeIcon}
            </div>

            <span className={styles.verticalSpacer} />

            <div
              ref={userIconRef}
              className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <User />
              <ChevronDown
                style={{
                  rotate: dropDownOpen ? "-180deg" : "",
                  transition: "all ease-in-out 200ms",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {dropDownOpen ? (
        <DropMenu
          full={showElement}
          dropDownRef={dropDownRef}
          modalStates={setModals}
        />
      ) : null}
    </>
  );
}
