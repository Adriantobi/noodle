import styles from "../../css/widgets/fortunewidget.module.css";
import { Sparkles } from "lucide-react";
import Widget, { WidgetProps } from "../Widget";

import { useState, useEffect } from "react";

function HeaderContent() {
  const dateToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };

  return (
    <div className={styles.headerContent}>
      <span className={styles.headerIcon}>
        <Sparkles />
      </span>
      <span
        className={styles.headerText}
      >{`Daily Fortune | ${dateToday()}`}</span>
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
        <div className={styles.todaysQuote}>
          <h3 className={styles.quoteText}>{`"${quote}"`}</h3>
        </div>
      </Widget>
    </>
  );
}
