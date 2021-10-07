import React, { useState, useEffect } from "react";
import "./App.scss";
import Select from "react-select";

export default function Home() {
    const [baseAmount, setBaseAmount] = useState();
    const [convertedAmount, setConvertedAmount] = useState();
    const [baseCurrency, setBaseCurrency] = useState();
    const [secondCurrency, setSecondCurrency] = useState();
    const [conversionFactor, setConversionFactor] = useState();

    const [currencyRates, setCurrencyRates] = useState([]);

    const init = async () => {
        let result = await fetch(
            "http://api.exchangeratesapi.io/v1/latest?access_key=7eb88623dbf9dce6d8c2b1772033fbf4"
        );
        result = await result.json();
        let rates = result.rates;

        for (const currency in rates) {
            // console.log(currency);
            // console.log(rates[currency]);

            setCurrencyRates((currencyRates) => [
                ...currencyRates,
                { value: rates[currency], label: currency },
            ]);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const handleBaseCurrencyChange = (baseCurrency) => {
        setBaseCurrency(baseCurrency);
        if (secondCurrency) {
            let newConversionFactor = secondCurrency.value / baseCurrency.value;
            setConversionFactor(newConversionFactor);
            setConvertedAmount(newConversionFactor * baseAmount);
        }
    };

    const handleSecondCurrencyChange = (secondCurrency) => {
        setSecondCurrency(secondCurrency);
        if (baseCurrency) {
            let newConversionFactor = secondCurrency.value / baseCurrency.value;
            setConversionFactor(newConversionFactor);
            setConvertedAmount(newConversionFactor * baseAmount);
        }
    };

    const handleBaseAmountChange = (e) => {
        setBaseAmount(e.target.value);
        if (conversionFactor) {
            setConvertedAmount(conversionFactor * e.target.value);
        }
    };

    return (
        <div className="currencyConverter">
            <h1 className="title"> Currency Converter</h1>
            <div className="amountOptions">
                <div className="amount">
                    <input
                        type="number"
                        className="baseAmount"
                        placeholder="..."
                        value={baseAmount}
                        maxLength={2}
                        onChange={handleBaseAmountChange}
                    />
                    {baseCurrency && <div>{baseCurrency.label}</div>}
                </div>
                {/* ={" "} */}
                <div className="amount">
                    <input
                        type="number"
                        className="convertedAmount"
                        value={convertedAmount}
                    />
                    {secondCurrency && <div>{secondCurrency.label}</div>}
                </div>
            </div>
            <div className="currencyOptions">
                <div className="baseCurrency">
                    <label>Base Currency</label>
                    <Select
                        onChange={handleBaseCurrencyChange}
                        options={currencyRates}
                        className="currencySelect"
                    />
                </div>
                <div className="secondCurrency">
                    <label>Second Currency</label>
                    <Select
                        onChange={handleSecondCurrencyChange}
                        options={currencyRates}
                        className="currencySelect"
                    />
                </div>
            </div>
            {/* <button
                onClick={() => console.log({ baseCurrency, secondCurrency })}
            >
                First and Second Currency
            </button>
            <button onClick={() => console.log({ conversionFactor })}>
                Conversion Factor
            </button> */}
        </div>
    );
}
