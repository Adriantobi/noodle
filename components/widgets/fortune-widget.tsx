import { Sparkles } from "lucide-react";
import Widget, { WidgetProps } from "../widget";

import { useState, useEffect } from "react";

function HeaderContent() {
  const dateToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: string | number = today.getMonth() + 1;
    let dd: string | number = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <span className="flex">
        <Sparkles className="h-[20px] w-[20px]" strokeWidth={1.5} />
      </span>
      <span className="flex items-center text-center opacity-65">{`Daily Fortune | ${dateToday()}`}</span>
    </div>
  );
}

export default function FortuneWidget({ display, widgetState }: WidgetProps) {
  const [quote, setQuote] = useState("");

  const getQuotes = () => {
    const inspo = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`; //Backup: https://type.fit/api/quotes

    fetch(inspo)
      .then((res) => res.json())
      .then((data) => {
        const dataQuotes = data.quotes;
        const randomNum = Math.floor(Math.random() * dataQuotes.length);
        const randomQuote = data.quotes[randomNum];

        setQuote(randomQuote.quote);
      });
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      <Widget
        title="Fortune"
        header={<HeaderContent />}
        clear={true}
        widgetState={widgetState}
        display={display}
      >
        <div className="flex px-[20px]">
          <h3 className="m-0 flex">{`"${quote}"`}</h3>
        </div>
      </Widget>
    </>
  );
}
