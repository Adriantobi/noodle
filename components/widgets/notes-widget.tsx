import WidgetCanvas, { WidgetProps } from "../widget";

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
        <div className="w-full h-full flex">
          <textarea
            className="flex w-full h-[calc(100%-24px)] text-sm bg-dark text-white outline-none no-underline border-none cursor-auto overflow-y-visible resize-none notes-input pt-4 px-[20px] min-h-[94px] placeholder:text-[#757575]"
            placeholder="Type your notes here..."
          />
        </div>
      </WidgetCanvas>
    </>
  );
}
