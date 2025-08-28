# 📘 Custom Hooks in React

## 🔹 What is a Custom Hook?
- A **custom hook** is just a JavaScript function that starts with `use (standardized approach like in useState and useEffect)`.
- It allows you to **reuse logic** (like fetching data, handling forms, timers, etc.) across multiple components.
- Custom hooks use React’s built-in hooks (`useState`, `useEffect`, etc.).

---

## 🔹 How It Works
1. **Takes Input** → parameters (e.g., currency name).  
2. **Uses Hooks** → manages state and side effects.  
   - `useState` creates a state variable (`data`) and a function (`setData`) to update it.  
   - When the API response comes, `setData(res[currency])` is called.  
   - This updates the `data` state with the latest currency info.  

3. **Returns Data** → so the component can use it.  
   - The hook ends with `return data;`.  
   - Whatever is stored in the `data` state (updated by `setData`) is sent back to the component.  
   - The component can then directly use this `data` in its UI.  
```jsx
// (App.jsx)
const currencyInfo = useCurrencyInfo(fromCurrency);
// useCurrencyInfo returns "data" which is an object
```

---

## 🔹 Example: Currency Info Hook
```js
import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then(res => res.json())
            .then(res => setData(res[currency]));
    }, [currency]);

    return data; // return state to the component
}

export default useCurrencyInfo;
```

## 🔹 Flow Diagram
```
Component calls useCurrencyInfo("usd")
             │
             ▼
   useCurrencyInfo starts
   ┌──────────────────────────┐
   │ useState({}) → data = {} │
   │ useEffect → fetch API    │
   │ setData(res["usd"])      │
   └──────────────────────────┘
             │
             ▼
   data is updated → returned
             │
             ▼
   Component receives data
   (e.g. USD conversion rates)

```