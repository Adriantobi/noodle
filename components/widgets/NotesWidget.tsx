import styles from "../../css/widgets/noteswidget.module.css";

import WidgetCanvas, { WidgetProps } from "../Widget";

export default function NotesWidget({ display, widgetState }: WidgetProps) {
  return (
    <>
      <WidgetCanvas
        title="Notes"
        header="Notes"
        resize={true}
        widgetState={widgetState}
        display={display}
      >
        <div className={styles.notesWrapper}>
          <textarea
            className={styles.notesInput}
            placeholder="Type your notes here..."
          />
        </div>
      </WidgetCanvas>
    </>
  );
}
