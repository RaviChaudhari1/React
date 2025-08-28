# React Hooks Summary

## 🔹 What is `useEffect`?
`useEffect` is a React hook that lets you perform **side effects** in function components.  
Side effects are actions that affect things outside the component’s rendering scope.

---

## 🔹 How it works
- Takes **two arguments**:  
  1. A function (the effect)  
  2. A dependency array  

- On **first render** → runs the effect function.  
- On **subsequent renders** → React checks dependencies:  
  - If **no change** → effect does not run again.  
  - If **changed** → effect runs again.  

- You can also return a **cleanup function** from the effect to remove listeners, clear timers, etc.

---

## 🔹 Common Use Cases
- Fetching data from an API  
- Subscribing/unsubscribing to events  
- Setting up timers/intervals  
- Manually updating DOM elements

---

## 🔹 Example
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer running...");
  }, 1000);

  return () => clearInterval(timer); // cleanup
}, []); // runs only once
```

## 🔹 What is `useRef`?
`useRef` is a React hook that lets you create a **mutable reference object** that persists between renders.
Unlike state, updating a ref does not cause re-renders.

### 🔹 How it works

- Returns an object with a .current property.

- The .current value can be updated without re-rendering the component.

- Useful for storing values that survive re-renders (like DOM elements, timers, previous values).