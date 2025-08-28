# React `useCallback` Hook Summary

## 🔹 What is `useCallback`?
`useCallback` is a React hook that **memoizes a function**, meaning it stores the function in memory and reuses the same function reference across re-renders, unless its dependencies change.

---

## 🔹 How it works
- Takes **two things**:  
  1. A function definition  
  2. A dependency array  

- On **first render** → returns the function you passed.  
```jsx
import React, { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);

  // First render → React stores this function in memory
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // no dependencies

  console.log("App rendered");

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;

// ✅ On the very first render, React takes increment and caches it.
// If you press the button, state updates → component re-renders, but since dependencies [] didn’t change → the same function reference is reused.

```
- On **subsequent renders** → React checks dependencies with `Object.is`:  
  - If **no change** → returns the **same cached function**  
  - If **changed** → returns a **new function**  
```jsx
import React, { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Function depends on `count`
  const logCount = useCallback(() => {
    console.log("Current count is:", count);
  }, [count]); // dependency: count

  console.log("App rendered");

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increase Count</button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type here"
      />
      <button onClick={logCount}>Log Count</button>
    </div>
  );
}

// ✅ What happens here:

// On first render → logCount is created and cached.

// If you type in the input (text changes) → App re-renders, but logCount does not change (since count dependency didn’t change).

// If you click "Increase Count" → count changes → React recreates logCount with the new count value.

```

---

## 🔹 Difference from `useEffect`
- `useEffect` runs **side effects** (like API calls, event listeners, timers **i.e, synchronize a component with an external system.**).  
- If dependencies change → the effect function **runs again**.  
- ⚠️ `useEffect` **does not cache functions**, it only re-executes side effects.

---

## 🔹 Difference from `useMemo`
- `useCallback` → returns a **memoized function**.  
- `useMemo` → returns a **memoized value (result of a function)**.  

👉 Rule of Thumb:  
- Cache a **function** → use `useCallback`.  
- Cache a **calculated value** → use `useMemo`.  

---

## 🔹 Common Use Cases

### 1. Skipping re-rendering of components  
- When passing a function as a prop to a memoized child component, `useCallback` ensures the child doesn’t re-render unnecessarily (since the function reference stays the same).

### 2. Updating state from a memoized callback  
- Useful when you want to update state in a stable way without creating a new function on each render.  
```jsx
const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
```

### 3. Preventing an Effect from firing too often
- Sometimes an effect depends on a callback. If the callback changes every render, the effect runs too often.
- Wrapping the callback in useCallback prevents unnecessary effect executions.

### 4. Optimizing a custom Hook
- Custom hooks can expose memoized callbacks so that the consuming components don’t get new function references every render.
- This helps in keeping performance stable.