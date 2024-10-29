import Widget, { WidgetProps } from "../widget";
import TaskItem from "./components/task-item";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react";

type Task = {
  taskKey: number;
  isChecked?: boolean;
  inputText?: string;
};

export default function TasksWidget({
  display,
  widgetState,
  defaultHeight,
  defaultWidth,
}: WidgetProps) {
  const savedTasks = JSON.parse(localStorage.getItem("task_list") || "{}");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [lastTaskKey, setLastTaskKey] = useState(-1);
  const [totalCheckedTasks, setTotalCheckedTasks] = useState(0);

  useEffect(() => {
    if (Object.keys(savedTasks).length > 0) {
      const tasks = Object.keys(savedTasks)
        .map((task) => ({
          taskKey: parseInt(task),
          isChecked: savedTasks[task].checked,
          inputText: savedTasks[task].taskText,
        }))
        .reverse();
      setTaskList(tasks);

      const checkedTasks = tasks.filter((task) => task.isChecked);
      setTotalCheckedTasks(checkedTasks.length);

      const maxTaskKey = Math.max(...tasks.map((task) => task.taskKey));
      setLastTaskKey(maxTaskKey);
    }
  }, []);

  const addItem = () => {
    setTaskList((prevTaskList) => [
      { taskKey: lastTaskKey + 1, isChecked: false, inputText: "" },
      ...prevTaskList,
    ]);
    setLastTaskKey(lastTaskKey + 1);
  };

  const removeTask = (taskKey: number) => {
    const newTask = {
      ...savedTasks,
    };
    delete newTask[taskKey];

    localStorage.setItem("task_list", JSON.stringify(newTask));

    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task.taskKey !== taskKey),
    );
  };

  const changeCheckedTasks = (toDo: string) => {
    if (toDo === "add") {
      if (totalCheckedTasks < taskList.length) {
        setTotalCheckedTasks(totalCheckedTasks + 1);
      }
    } else if (toDo === "remove") {
      if (totalCheckedTasks > 0) {
        setTotalCheckedTasks(totalCheckedTasks - 1);
      }
    }
  };

  return (
    <>
      <Widget
        title="Tasks"
        header="Tasks"
        resize={true}
        widgetState={widgetState}
        display={display}
        visibleResize={true}
        defaultHeight={defaultHeight}
        defaultWidth={defaultWidth}
      >
        <div
          className="flex text-white gap-[5px] text-sm leading-4 rounded-lg py-[6px] px-[15px] mt-[10px] mb-1 mx-5 cursor-pointer font-extralight hover:bg-[#515151]"
          onClick={addItem}
        >
          <Plus className="w-[14px] h-[14px]" />
          <span>Add task</span>
        </div>
        <div className="flex flex-col overflow-scroll h-[calc(100%-60px)] scrollbar-gutter-stable tasks-list">
          {taskList.map((task) =>
            task.inputText || task.isChecked ? (
              <TaskItem
                key={task.taskKey}
                taskKey={task.taskKey}
                removeTask={removeTask}
                changeCheckedTasks={changeCheckedTasks}
                isChecked={task.isChecked}
                inputText={task.inputText}
              />
            ) : (
              <TaskItem
                key={task.taskKey}
                taskKey={task.taskKey}
                removeTask={removeTask}
                changeCheckedTasks={changeCheckedTasks}
              />
            ),
          )}
        </div>
        <div className="flex py-1 px-3 absolute justify-center items-center bg-dark bottom-3 w-full gap-[10px]">
          <div className="h-[10px] w-full rounded-[5px] bg-[#767676]">
            <div
              className="rounded-[5px] max-w-full h-[10px] bg-[#B6B6B6]"
              style={{
                width: `${(totalCheckedTasks / taskList.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs flex whitespace-nowrap">{`${totalCheckedTasks} / ${taskList.length}`}</span>
        </div>
      </Widget>
    </>
  );
}
