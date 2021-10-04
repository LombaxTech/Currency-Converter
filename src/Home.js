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
            setConversionFactor(secondCurrency.value / baseCurrency.value);
        }
    };

    const handleSecondCurrencyChange = (secondCurrency) => {
        setSecondCurrency(secondCurrency);
        if (baseCurrency) {
            setConversionFactor(secondCurrency.value / baseCurrency.value);
        }
    };

    const handleBaseAmountChange = (e) => {
        setBaseAmount(e.target.value);
        if (conversionFactor) {
            setConvertedAmount(conversionFactor * e.target.value);
        }
    };

    return (
        <div>
            <h1 className="title"> Currency Converter</h1>
            <div>
                <input
                    type="number"
                    className="baseAmount"
                    placeholder="Enter Base Amount..."
                    value={baseAmount}
                    onChange={handleBaseAmountChange}
                />
                {baseCurrency && <div>{baseCurrency.label}</div>}={" "}
                <input
                    type="number"
                    className="convertedAmount"
                    value={convertedAmount}
                />
                {secondCurrency && <div>{secondCurrency.label}</div>}
            </div>
            <div>
                <label>Base Currency</label>
                <Select
                    onChange={handleBaseCurrencyChange}
                    options={currencyRates}
                />

                <label>Second Currency</label>
                <Select
                    onChange={handleSecondCurrencyChange}
                    options={currencyRates}
                />
                <button
                    onClick={() =>
                        console.log({ baseCurrency, secondCurrency })
                    }
                >
                    First and Second Currency
                </button>
                <button onClick={() => console.log({ conversionFactor })}>
                    Conversion Factor
                </button>
            </div>
        </div>
    );
}
