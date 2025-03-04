import { X } from "lucide-react";

type ModalProps = {
  title: string;
  setState: (arg0: string) => void;
  name: string;
  children: React.ReactNode;
  ignoreRef?: React.RefObject<HTMLDivElement>;
};

export default function Modal({
  title,
  setState,
  ignoreRef,
  name,
  children,
}: ModalProps) {
  return (
    <div
      ref={ignoreRef}
      className="fixed left-0 top-0 z-5000 h-screen w-screen bg-[#333333] bg-opacity-80"
      onClick={() => setState(name)}
    >
      <div
        className="modal fixed left-0 right-0 top-[10%] z-50 m-auto flex h-fit max-h-[80%] max-w-[620px] flex-col justify-start overflow-y-auto rounded-lg bg-dark p-[20px] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-between px-[20px]">
          <span className="w-[90%] text-[22px]">{title}</span>
          <span
            className="absolute right-[10px] top-0 flex h-9 cursor-pointer items-center justify-center px-[5px]"
            onClick={() => {
              setState(name);
            }}
          >
            <X className="h-[18px] w-[18px]" />
          </span>
        </div>
        <div className="my-[10px] flex flex-col justify-between px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
