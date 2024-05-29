import styles from "../../css/widgets/taskswidget.module.css";

import Widget, { WidgetProps } from "../Widget";
import TaskItem, { TaskItemProps } from "./components/TaskItem";
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
  const [lastTaskKey, setLastTaskKey] = useState(0);
  const [totalCheckedTasks, setTotalCheckedTasks] = useState(0);

  useEffect(() => {
    if (Object.keys(savedTasks).length > 0) {
      const tasks = Object.keys(savedTasks).map((task) => ({
        taskKey: parseInt(task),
        isChecked: savedTasks[task].checked,
        inputText: savedTasks[task].taskText,
      })).reverse();
      setTaskList(tasks);
      setLastTaskKey(tasks[tasks.length - 1].taskKey + 1);
    }
  }, []);

  const addItem = () => {
    const newTaskKey = lastTaskKey;
    setTaskList((prevTaskList) => [{ taskKey: newTaskKey }, ...prevTaskList]);
    setLastTaskKey(newTaskKey + 1);
  };

  const removeTask = (taskKey: number) => {
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
        <div className={styles.newTaskItem} onClick={addItem}>
          <Plus />
          <span>Add task</span>
        </div>
        <div className={styles.tasksList}>
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
        <div className={styles.taskProgress}>
          <div className={styles.progressBar}>
            <div
              className={styles.innerProgressBar}
              style={{
                width: `${(totalCheckedTasks / taskList.length) * 100}%`,
              }}
            />
          </div>
          <span
            className={styles.progressInfo}
          >{`${totalCheckedTasks} / ${taskList.length}`}</span>
        </div>
      </Widget>
    </>
  );
}
