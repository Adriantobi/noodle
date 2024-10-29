import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Instagram, Mail, Twitter, User, Wrench, LinkIcon } from "lucide-react";
import { cn } from "@/lib/util";

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
      className={cn(
        "w-[200px] h-fit flex flex-col text-white rounded-lg z-50 absolute top-[51px] right-2 mt-[5px] mb-[5px] pt-[5px] pb-[5px] bg-dark",
        full && "top-[52px]",
      )}
    >
      {status === "authenticated" ? (
        <span
          className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]"
          onClick={() => modalStates("account")}
        >
          <div className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
            <User className="w-4 h-4" />
            My Account
          </div>
        </span>
      ) : (
        <span
          className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]"
          onClick={() => signIn("google")}
        >
          <div className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
            Signup/Login
          </div>
        </span>
      )}
      <span
        className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]"
        onClick={() => modalStates("appearance")}
      >
        <div className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
          <Wrench className="w-4 h-4" />
          Appearance
        </div>
      </span>
      <span
        className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]"
        onClick={() => modalStates("stats")}
      >
        <div className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
          Your Stats
        </div>
      </span>
      <span className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]">
        <Link
          className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full"
          href="https://discord.com/invite/sfEkz5aZW7"
          target="_blank"
        >
          <svg
            fill="#5865f2"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#5865f2"
            className="w-4 h-4"
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
      <span className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]">
        <Link
          className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full"
          href="https://github.com/Adriantobi/noodle"
          target="_blank"
        >
          Changelog
        </Link>
      </span>
      <span className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]">
        <div className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
          Feedback
        </div>
      </span>
      <span className="border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]">
        <div className="px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
          Help
        </div>
      </span>
      <div className="flex justify-between">
        <span className="w-full border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]">
          <div className="justify-center px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
            Privacy
          </div>
        </span>
        <span className="before:content-[''] before:flex before:bottom-0 before:right-0 before:h-full before:w-[1px] before:border-l before:border-l-[#515151]" />
        <span className="w-full border-b border-b-[#515151] flex h-9 cursor-pointer items-center px-[10px] py-[6px]">
          <div className="justify-center px-[5px] flex items-center no-underline gap-[5px] text-white w-full h-full">
            Terms
          </div>
        </span>
      </div>
      <span className="flex h-9 cursor-pointer items-center px-[10px] py-[6px] justify-around">
        <div className="flex justify-center items-center">
          <Link
            className="flex justify-center items-center"
            href="https://www.instagram.com/adrian.td"
            target="_blank"
          >
            <Instagram className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            className="flex justify-center items-center"
            href="https://www.twitter.com/adriantdoav"
            target="_blank"
          >
            <Twitter className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            className="flex justify-center items-center"
            href="https://www.adriantd.com"
            target="_blank"
          >
            <LinkIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            className="flex justify-center items-center"
            href="mailto:talktotobi.a@gmail.com"
          >
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </span>
    </div>
  );
}
