import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./customHooks/useCurrencyInfo";

function App() {
  // amount to be converted
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  // converted amount
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(fromCurrency);
  // useCurrencyInfo returns "data" which is an object
  const options = Object.keys(currencyInfo);

const swapCurrency = () => {
  setFromCurrency(toCurrency);
  setToCurrency(fromCurrency);
  setAmount(convertedAmount);
  setConvertedAmount(amount);
};


  // currency info returns keys, i.e, currency to which amount can be converted
  // currencyInfo[toCurrency] returns the value of the key, i.e, the conversion rate which is then multiplied with the amount to give converted amount
  // converted amount is set using setConvertedAmount
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1746457256184-9a93292b1765?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => {
                      setFromCurrency(currency);
                    }}
                    selectCurrency={fromCurrency}
                    onAmountChange={(amount) => setAmount(amount)}
                  />
            </div>
            <div className="relative w-full h-0.5">
                  <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                    onClick={swapCurrency}
                  >
                    swap
                  </button>
            </div>
            <div className="w-full mt-1 mb-4">
                  <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => {
                      setToCurrency(currency)}
                  }
                    selectCurrency={toCurrency}
                    amountDisabled
                  />
                </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
