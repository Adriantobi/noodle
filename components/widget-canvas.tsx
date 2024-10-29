import FortuneWidget from "./widgets/fortune-widget";
import MediaWidget from "./widgets/media-widget";
import NotesWidget from "./widgets/notes-widget";
import PomodoroWidget from "./widgets/pomodoro-widget";
import SoundBoardWidget from "./widgets/sound-board-widget";
import TasksWidget from "./widgets/tasks-widget";

type WidgetCanvasProps = {
  states: boolean[];
  widgetState: (arg0: string) => void;
  mobile: boolean;
};

export default function WidgetCanvas({
  states,
  widgetState,
}: WidgetCanvasProps) {
  return (
    <div className="flex fixed w-full bottom-0 h-[calc(100%-56px)]">
      <FortuneWidget display={states[5]} widgetState={widgetState} />
      <NotesWidget display={states[2]} widgetState={widgetState} />
      <MediaWidget
        display={states[3]}
        widgetState={widgetState}
        defaultHeight={"236"}
        defaultWidth={"400"}
      />
      <PomodoroWidget display={states[0]} widgetState={widgetState} />
      <TasksWidget
        display={states[1]}
        widgetState={widgetState}
        defaultHeight={"240"}
        defaultWidth={"400"}
      />
      <SoundBoardWidget
        display={states[4]}
        widgetState={widgetState}
        defaultHeight={"280"}
      />
    </div>
  );
}
