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
      className="bg-[#333333] bg-opacity-80 h-screen w-screen fixed top-0 left-0 z-[5000]"
      onClick={() => setState(name)}
    >
      <div
        className="bg-dark text-white flex flex-col justify-start h-fit max-w-[620px] fixed top-[10%] left-0 right-0 m-auto p-[20px] rounded-lg max-h-[80%] overflow-y-auto z-50 modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between w-full px-[20px]">
          <span className="w-[90%] text-[22px]">{title}</span>
          <span
            className="cursor-pointer absolute top-0 right-[10px] flex justify-center items-center px-[5px] h-9"
            onClick={() => {
              setState(name);
            }}
          >
            <X className="w-[18px] h-[18px]" />
          </span>
        </div>
        <div className="flex flex-col justify-between my-[10px] px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
