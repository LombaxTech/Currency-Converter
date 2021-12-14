import React, { useState, useEffect } from "react";
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
        console.log({ result });
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
        // * if input is a number returns false
        if (isNaN(e.target.value)) return;
        // TODO: add warning for non number values

        setBaseAmount(e.target.value);
        if (conversionFactor) {
            setConvertedAmount(conversionFactor * e.target.value);
        }
    };

    return (
        <div className="w-1/2 rounded-lg text-white bg-slate-500 shadow-slate-900 shadow-2xl m-auto  p-8 gap-8 flex flex-col items-center sm:w-full md:w-3/4 ">
            <h1 className=" font-extrabold text-4xl text-center">
                Currency Converter
            </h1>
            <div className="flex gap-4 text-black w-full justify-center md:flex-col">
                <div className="amount bg-transparent">
                    <input
                        type="tel"
                        className="baseAmount p-2 text-xl w-full "
                        placeholder="Base Amount"
                        value={baseAmount}
                        onChange={handleBaseAmountChange}
                    />
                    {baseCurrency && (
                        <div className="text-white font-bold text-center mt-2">
                            {baseCurrency.label}
                        </div>
                    )}
                </div>
                <div className="amount">
                    <input
                        type="number"
                        className="baseAmount p-2 text-xl  w-full"
                        value={convertedAmount}
                        placeholder="......"
                    />
                    {secondCurrency && (
                        <div className="text-white font-bold text-center mt-2">
                            {secondCurrency.label}
                        </div>
                    )}
                </div>
            </div>
            <div className="currencyOptions flex gap-8">
                <div className="baseCurrency flex flex-col gap-2">
                    <label className="font-bold text-lg">Base Currency</label>
                    <Select
                        onChange={handleBaseCurrencyChange}
                        options={currencyRates}
                        className="currencySelect text-black"
                    />
                </div>
                <div className="secondCurrency flex flex-col gap-2">
                    <label className="font-bold text-lg">Second Currency</label>
                    <Select
                        onChange={handleSecondCurrencyChange}
                        options={currencyRates}
                        className="currencySelect text-black"
                    />
                </div>
            </div>
        </div>
    );
}
