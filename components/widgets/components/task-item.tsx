import { useState, useEffect, useRef } from "react";
import { MoreVertical, Trash } from "lucide-react";
import { cn } from "@/lib/util";

type TaskItemProps = {
  taskKey: number;
  removeTask: (arg0: number) => void;
  changeCheckedTasks: (arg0: string) => void;
  isChecked?: boolean;
  inputText?: string;
};

export default function TaskItem({
  taskKey,
  removeTask,
  changeCheckedTasks,
  isChecked,
  inputText,
}: TaskItemProps) {
  const [checked, setChecked] = useState<boolean | null>(
    isChecked ? isChecked : null,
  );
  const [more, setMore] = useState(false);
  const [taskText, setTaskText] = useState(inputText ? inputText : "");
  const taskItemRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (checked === true) {
      if ((taskItemRef.current as HTMLTextAreaElement).value !== "") {
        (taskItemRef.current as HTMLTextAreaElement).style.textDecoration =
          "line-through";
        (taskItemRef.current as HTMLTextAreaElement).style.color =
          "rgb(145, 148, 152)";
      }
    } else if (checked === false) {
      (taskItemRef.current as HTMLTextAreaElement).style.textDecoration =
        "none";
      (taskItemRef.current as HTMLTextAreaElement).style.color =
        "rgb(255, 255, 255)";
    }
  }, [checked]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("task_list") || "{}");
    const newTask = {
      ...savedTasks,
      [taskKey]: {
        taskText: taskText,
        checked: checked,
      },
    };

    localStorage.setItem("task_list", JSON.stringify(newTask));
  }, [taskText, checked, taskKey]);

  const deleteTask = () => {
    removeTask(taskKey);
    const savedTasks = JSON.parse(localStorage.getItem("task_list") || "{}");
    delete savedTasks[taskKey];
    localStorage.setItem("task_list", JSON.stringify(savedTasks));
    if (checked && taskItemRef.current?.value !== "") {
      changeCheckedTasks("remove");
    }
  };

  const autoHeight = () => {
    const text = taskItemRef.current as HTMLElement;
    text.style.height = "18px";
    text.style.height = `${text.scrollHeight}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskText(e.target.value);
    autoHeight();
  };

  return (
    <div
      className="flex pl-3 pr-[10px] pb-[2px] pt-[6px] justify-between cursor-grab w-full relative overflow-visible items-start group"
      key={taskKey}
      draggable={true}
    >
      <div
        className={cn(
          "cursor-grab hidden mt-3 group-hover:flex",
          "justify-center items-center",
        )}
      >
        <MoreVertical className="w-[16px] h-[16px] -ml-3" />
        <MoreVertical className="w-[16px] h-[16px] -ml-3" />
      </div>

      <div className="w-full flex justify-start gap-2 items-start border border-[#515151] rounded-[5px] ml-2 p-[10px] group-hover:ml-0 hover:border-[#B9D1FF]">
        <input
          className={cn(
            "appearance-none bg-transparent m-0 cursor-pointer min-w-[16px] min-h-[16px] w-[16px] h-[16px] border-[1px] border-[#919498] rounded-[2px] flex justify-center items-center",
            "before:content-[''] before:bg-tick before:w-full before:h-full",
            "before:bg-[length:16px_16px] before:scale-0 before:flex before:justify-center before:items-center checked:before:scale-100",
          )}
          type="checkbox"
          defaultChecked={checked !== null ? checked : false}
          onClick={() => {
            if (
              (taskItemRef.current as HTMLTextAreaElement).value === null ||
              (taskItemRef.current as HTMLTextAreaElement).value === ""
            ) {
              deleteTask();
            } else {
              setChecked(!checked);
              changeCheckedTasks(!checked ? "add" : "remove");
            }
          }}
        />
        <textarea
          ref={taskItemRef}
          className="text-sm outline-none border-none bg-transparent flex box-border w-[calc(100%-48px)] min-h-[18px] h-[18px] max-h-[400px] overflow-hidden text-white leading-4 pl-1 resize-none font-[100] hover:bg-[#434446] rounded-[2px] placeholder:text-[#5c5d5e]"
          onChange={handleChange}
          placeholder="Add a task"
          value={taskText}
          disabled={checked === true ? true : false}
        />
        <span
          className="hidden cursor-pointer group-hover:flex"
          onClick={() => deleteTask()}
        >
          {/*setMore(!more)*/}
          {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>*/}
          <Trash className="w-[16px] h-[16px]" />
        </span>
      </div>

      {more ? (
        <div className="flex justify-center items-center flex-col fixed -right-[85px] top-[50px] bg-dark w-fit min-w-[250px] h-auto rounded-[5px] shadow-more overflow-hidden z-[1003]">
          <div className="text-sm flex items-center w-full p-[10px] text-white cursor-pointer hover:bg-dark">
            Edit
          </div>
          <div
            className="text-sm flex items-center w-full p-[10px] text-white cursor-pointer hover:bg-dark"
            onClick={() => deleteTask()}
          >
            Delete
          </div>
        </div>
      ) : null}
    </div>
  );
}
