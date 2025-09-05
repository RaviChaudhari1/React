# 📌 State Management in React – Short Summary


## 1. Context API
- Built-in React tool for **global state management**.  
- Eliminates **prop drilling** by providing values directly to components.  
- Good for **small to medium apps**.  
- Not efficient for very **large/complex apps** (frequent re-renders).



## 2. Prop Drilling
- Passing data **manually** from parent → child → grandchild (through props).  
- Works fine for **small apps**, but becomes **hard to maintain** in bigger projects.  
- Context API/Redux/Zustand solve this problem.



## 3. Redux
- A **state management library** (not part of React).  
- Uses a **central store** → all components can access/update it.  
- Strict pattern: **Actions → Reducers → Store**.  
- Predictable and scalable, but verbose (too much boilerplate).



## 4. React-Redux
- Official **Redux binding for React**.  
- Provides `Provider` and hooks like `useSelector`, `useDispatch` to connect Redux store with React components.  
- Makes using Redux inside React apps easier.



## 5. Redux Toolkit (RTK)
- Modern, simplified way to use Redux.  
- Reduces boilerplate with utilities like `createSlice`, `configureStore`.  
- Includes built-in **async handling (RTK Query)**.  
- Recommended way to use Redux today.



## 6. Zustand
- Lightweight **state management library**.  
- Much simpler than Redux (no actions/reducers needed).  
- Uses **hooks** to manage global state.  
- Good for small-medium apps that need something **simpler than Redux but more powerful than Context API**.



## 7. State Management (Overall)
- **Local State** → managed with `useState`, `useReducer`.  
- **Global State** → managed with Context, Redux, RTK, Zustand, etc.  
- **When to use what?**
  - Small app → Local state or Context API.  
  - Medium app → Context API or Zustand.  
  - Large/enterprise app → Redux Toolkit.  



# ⚖️ Comparison Table

| Feature / Tool     | Context API                | Redux               | Redux Toolkit (RTK)     | Zustand                  |
|---------------------|----------------------------|---------------------|--------------------------|--------------------------|
| **Type**            | Built-in React API        | External library    | Modern Redux wrapper     | External library         |
| **Setup**           | Very simple               | Complex/verbose     | Medium (simplified)      | Very simple              |
| **Best For**        | Small-medium apps         | Large apps          | Large apps (recommended) | Small-medium apps        |
| **Boilerplate**     | Low                       | High                | Low                      | Very Low                 |
| **Performance**     | Can cause re-renders      | Efficient w/ memo   | Efficient w/ memo        | Very efficient           |
| **Async Handling**  | Manual (useEffect)        | With middleware     | Built-in (RTK Query)     | Simple async support     |
| **Learning Curve**  | Easy                      | Steep               | Medium                   | Easy                     |


