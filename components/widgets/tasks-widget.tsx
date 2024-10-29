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
          className="mx-5 mb-1 mt-[10px] flex cursor-pointer gap-[5px] rounded-lg px-[15px] py-[6px] text-sm font-extralight leading-4 text-white hover:bg-[#515151]"
          onClick={addItem}
        >
          <Plus className="h-[14px] w-[14px]" />
          <span>Add task</span>
        </div>
        <div className="scrollbar-gutter-stable tasks-list flex h-[calc(100%-60px)] flex-col overflow-scroll">
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
        <div className="absolute bottom-3 flex w-full items-center justify-center gap-[10px] bg-dark px-3 py-1">
          <div className="h-[10px] w-full rounded-[5px] bg-[#767676]">
            <div
              className="h-[10px] max-w-full rounded-[5px] bg-[#B6B6B6]"
              style={{
                width: `${(totalCheckedTasks / taskList.length) * 100}%`,
              }}
            />
          </div>
          <span className="flex whitespace-nowrap text-xs">{`${totalCheckedTasks} / ${taskList.length}`}</span>
        </div>
      </Widget>
    </>
  );
}
