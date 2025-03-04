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
        <div className="flex h-full w-full">
          <textarea
            className="notes-input flex h-[calc(100%-24px)] min-h-[94px] w-full cursor-auto resize-none overflow-y-visible border-none bg-dark px-[20px] pt-4 text-sm text-white no-underline outline-hidden placeholder:text-[#757575]"
            placeholder="Type your notes here..."
          />
        </div>
      </WidgetCanvas>
    </>
  );
}
