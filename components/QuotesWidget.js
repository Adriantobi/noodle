'use client'

import styles from '../css/quotewidget.module.css'

import Widget from './Widget'

import { useState, useEffect} from 'react'

export default function QuoteWidget( props ) {
    const [ quote, setQuote ] = useState('');

    const getQuotes = () => {
        const inspo = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json` //Backup: https://type.fit/api/quotes
        
        fetch(inspo).then((res) => res.json()).then((data) => {
            let dataQuotes = data.quotes
            let randomNum = Math.floor(Math.random() * dataQuotes.length);
            let randomQuote = data.quotes[randomNum]

            setQuote(randomQuote.quote)
        })
    }

    useEffect(() => {
        getQuotes()
    }, [])

    const dateToday = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday
    }

    return (
        <>
                <Widget name='Quote' header={`Daily Quote | ${dateToday()}`} resize={false} clear={true} close={props.function} display={props.display}>
                    <div className={styles.todaysQuote}>
                        <h3 className={styles.quoteText}>{`"${quote}"`}</h3>
                    </div>
                </Widget>
        </>
    )
}