import Link from "next/link";
import styles from "../css/dropdown.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { Instagram, Mail, Twitter, User, Wrench, LinkIcon } from "lucide-react";

type DropMenuProps = {
  full: boolean;
  modalStates: (arg0: string) => void;
  dropDownRef: React.RefObject<HTMLDivElement>;
};

export default function DropMenu({
  full,
  modalStates,
  dropDownRef,
}: DropMenuProps) {
  const { status } = useSession();

  return (
    <div
      ref={dropDownRef}
      className={`${styles.dropDownMenu} ${full ? "" : `${styles.top}`}`}
    >
      {status === "authenticated" ? (
        <span
          className={styles.dropDownMenuButton}
          onClick={() => modalStates("account")}
        >
          <div>
            <User />
            My Account
          </div>
        </span>
      ) : (
        <span
          className={styles.dropDownMenuButton}
          onClick={() => signIn("google")}
        >
          <div>Signup/Login</div>
        </span>
      )}
      <span
        className={styles.dropDownMenuButton}
        onClick={() => modalStates("appearance")}
      >
        <div>
          <Wrench />
          Appearance
        </div>
      </span>
      <span
        className={styles.dropDownMenuButton}
        onClick={() => modalStates("stats")}
      >
        <div>Your Stats</div>
      </span>
      <span className={styles.dropDownMenuButton}>
        <Link href="https://discord.com/invite/sfEkz5aZW7" target="_blank">
          <svg
            fill="#5865f2"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#5865f2"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M464,66.52A50,50,0,0,0,414.12,17L97.64,16A49.65,49.65,0,0,0,48,65.52V392c0,27.3,22.28,48,49.64,48H368l-13-44L464,496ZM324.65,329.81s-8.72-10.39-16-19.32C340.39,301.55,352.5,282,352.5,282a139,139,0,0,1-27.85,14.25,173.31,173.31,0,0,1-35.11,10.39,170.05,170.05,0,0,1-62.72-.24A184.45,184.45,0,0,1,191.23,296a141.46,141.46,0,0,1-17.68-8.21c-.73-.48-1.45-.72-2.18-1.21-.49-.24-.73-.48-1-.48-4.36-2.42-6.78-4.11-6.78-4.11s11.62,19.09,42.38,28.26c-7.27,9.18-16.23,19.81-16.23,19.81-53.51-1.69-73.85-36.47-73.85-36.47,0-77.06,34.87-139.62,34.87-139.62,34.87-25.85,67.8-25.12,67.8-25.12l2.42,2.9c-43.59,12.32-63.44,31.4-63.44,31.4s5.32-2.9,14.28-6.77c25.91-11.35,46.5-14.25,55-15.21a24,24,0,0,1,4.12-.49,205.62,205.62,0,0,1,48.91-.48,201.62,201.62,0,0,1,72.89,22.95S333.61,145,292.44,132.7l3.39-3.86S329,128.11,363.64,154c0,0,34.87,62.56,34.87,139.62C398.51,293.34,378.16,328.12,324.65,329.81Z"></path>
              <path d="M212.05,218c-13.8,0-24.7,11.84-24.7,26.57s11.14,26.57,24.7,26.57c13.8,0,24.7-11.83,24.7-26.57C237,229.81,225.85,218,212.05,218Z"></path>
              <path d="M300.43,218c-13.8,0-24.7,11.84-24.7,26.57s11.14,26.57,24.7,26.57c13.81,0,24.7-11.83,24.7-26.57S314,218,300.43,218Z"></path>
            </g>
          </svg>
          Noodle Discord
        </Link>
      </span>
      <span className={styles.dropDownMenuButton}>
        <Link href="https://github.com/Adriantobi/noodle" target="_blank">
          Changelog
        </Link>
      </span>
      <span className={styles.dropDownMenuButton}>
        <div>Feedback</div>
      </span>
      <span className={styles.dropDownMenuButton}>
        <div>Help</div>
      </span>
      <div className={styles.dualButton}>
        <span className={styles.dropDownMenuButton}>
          <div>Privacy</div>
        </span>
        <span className={styles.verticalSpacer} />
        <span className={styles.dropDownMenuButton}>
          <div>Terms</div>
        </span>
      </div>
      <span className={`${styles.dropDownMenuButton} ${styles.linkSection}`}>
        <div className={styles.buttonLink}>
          <Link href="https://www.instagram.com/adrian.td" target="_blank">
            <Instagram />
          </Link>
        </div>
        <div className={styles.buttonLink}>
          <Link href="https://www.twitter.com/adriantdoav" target="_blank">
            <Twitter />
          </Link>
        </div>
        <div className={styles.buttonLink}>
          <Link href="https://www.adriantd.com" target="_blank">
            <LinkIcon />
          </Link>
        </div>
        <div className={styles.buttonLink}>
          <Link href="mailto:talktotobi.a@gmail.com">
            <Mail />
          </Link>
        </div>
      </span>
    </div>
  );
}
