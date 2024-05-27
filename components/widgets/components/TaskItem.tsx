import styles from "../../../css/widgets/components/taskitem.module.css";

import { useState, useEffect, useRef } from "react";
import { MoreVertical, Trash } from "lucide-react";

export type TaskItemProps = {
  taskKey: number;
  removeTask: (arg0: number) => void;
  changeCheckedTasks: (arg0: string) => void;
};

export default function TaskItem({
  taskKey,
  removeTask,
  changeCheckedTasks,
}: TaskItemProps) {
  const [checked, setChecked] = useState<boolean | null>(null);
  const [display, setDisplay] = useState(true);
  const [more, setMore] = useState(false);
  const [taskText, setTaskText] = useState("");
  const taskItemNameRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (checked === true) {
      if ((taskItemNameRef.current as HTMLTextAreaElement).value === "") {
        deleteTask();
      } else if (
        (taskItemNameRef.current as HTMLTextAreaElement).value !== ""
      ) {
        (taskItemNameRef.current as HTMLTextAreaElement).style.textDecoration =
          "line-through";
        (taskItemNameRef.current as HTMLTextAreaElement).style.color =
          "rgb(145, 148, 152)";
        changeCheckedTasks("add");
      }
    } else if (checked === false) {
      (taskItemNameRef.current as HTMLTextAreaElement).style.textDecoration =
        "none";
      (taskItemNameRef.current as HTMLTextAreaElement).style.color =
        "rgb(255, 255, 255)";
      changeCheckedTasks("remove");
    }
  }, [checked]);

  const deleteTask = () => {
    setDisplay(false);
    removeTask(taskKey);
    if (checked === true) {
      changeCheckedTasks("remove");
    }
  };

  const autoHeight = () => {
    const text = taskItemNameRef.current as HTMLElement;
    text.style.height = "18px";
    text.style.height = `${text.scrollHeight}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskText(e.target.value);
    autoHeight();
  };

  return (
    <>
      {display ? (
        <div className={styles.taskItem} key={taskKey} draggable={true}>
          <div className={`${styles.dragItem} ${styles.iconButtons}`}>
            <MoreVertical />
            <MoreVertical />
          </div>

          <div className={styles.itemDetails}>
            <input type="checkbox" onClick={() => setChecked(!checked)} />
            <textarea
              ref={taskItemNameRef}
              className={styles.taskItemName}
              onChange={handleChange}
              placeholder="Add a task"
              value={taskText}
              disabled={checked === true ? true : false}
            />
            <span className={styles.moreOptions} onClick={() => deleteTask()}>
              {" "}
              {/*setMore(!more)*/}
              {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>*/}
              <Trash />
            </span>
          </div>

          {more ? (
            <div className={styles.itemActions}>
              <div className={styles.actionItem}>Edit</div>
              <div className={styles.actionItem} onClick={() => deleteTask()}>
                Delete
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
