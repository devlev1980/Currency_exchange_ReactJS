import './App.css';
import React, {useEffect, useState} from "react";
import CurrencyRow from "./components/Currency_row";


const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([]);
    console.log('options', currencyOptions);
    const [fromCurrency, setFromCurrency] = useState();
    console.log('selected fromCurrency', fromCurrency)
    const [toCurrency, setToCurrency] = useState();
    console.log('selected toCurrency', toCurrency);
    const [exchangeRate, setExchangeRate] = useState();
    console.log('exchange rate', exchangeRate);
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let fromAmount, toAmount;

    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }
    useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                    const firstCurrency = Object.keys(data.rates)[0]
                    setCurrencyOptions([data.base, ...Object.keys(data.rates)])
                    setFromCurrency(data.base)
                    setToCurrency(firstCurrency)
                    setExchangeRate(data.rates[firstCurrency]);
                }
            )
    }, []);

    useEffect(() => {
        if(fromCurrency !== undefined && toCurrency !== undefined){
            fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }

    }, [fromCurrency, toCurrency])

    const onSelectFromCurrencyOption = (e) => {
        setFromCurrency(e.target.value)
    };
    const onSelectToCurrencyOption = (e) => {
        setToCurrency(e.target.value)
    };
    const handleFromAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(true)
    };
    const handleToAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    };

    return (
        <>
            <h1>Currency converter</h1>
            <CurrencyRow currencyOptions={currencyOptions}
                         selectedCurrency={fromCurrency}
                         onSelectCurrencyOption={onSelectFromCurrencyOption}
                         amount={fromAmount}
                         onChangeAmount={handleFromAmountChange}/>
            <div className='equals'>=</div>
            <CurrencyRow currencyOptions={currencyOptions}
                         selectedCurrency={toCurrency}
                         onSelectCurrencyOption={onSelectToCurrencyOption}
                         amount={toAmount}
                         onChangeAmount={handleToAmountChange}/>
        </>

    );
}

export default App;
