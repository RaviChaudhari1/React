# Props in React

## What are Props?
- **Props** (short for *properties*) are used to **pass data** from a parent component to a child component.
- They make components **reusable** and **dynamic**.

---

# What Can We Pass in Props?

- Props can take **any JavaScript value**:  
  - **Strings** → `<Card title="Giant Squid" />`  
  - **Numbers** → `<Card size={42} />`  
  - **Booleans** → `<Card isVisible={true} />`  
  - **Arrays** → `<List items={['a', 'b', 'c']} />`  
  - **Objects** → `<User info={{ name: "Ravi", age: 18 }} />`  
  - **Functions** → `<Button onClick={handleClick} />`  
  - **JSX/Components** → `<Layout header={<Header />} />`  

⚡ Important:  
- Strings can be passed directly with quotes (`"text"`).  
- For everything else (numbers, arrays, objects, functions, expressions), you must use **curly braces `{}`**.  
- Props are **read-only** → components should not modify them.  

✅ In short: **Props can take any valid JS expression wrapped in `{}`.**


---


# What Props Return in React

- In React, **props are always passed as an object**.  
- Each key in the object corresponds to the prop name.  
- Example:
```jsx
  <Card title="Giant Squid" src="image.jpg" description="Deep-sea creature" />

 // The Card component receives:
const props = { 
  title: "Giant Squid",
  src: "image.jpg",
  description: "Deep-sea creature"
}
```

### Parent Component (`App.jsx`)
```jsx
<Card 
  src="https://images.pexels.com/photos/598961/pexels-photo-598961.jpeg" 
  title="Grand Canyon" 
  description="It’s so huge that it creates its own weather..."
  // Here, src, title, and description are passed as props to the Card component.
/>
```
### Child Component (Card.jsx)

```jsx
const Card = (props) => {
  return (
    <div>
      <img src={props.src} alt="" />
      <span>{props.title}</span>
      <p>{props.description}</p>
    </div>
  )
}
// The Card component receives props and uses them to display dynamic content.
```

# Avoiding Prop Drilling in React

## The Problem: Prop Drilling
- When a value (like `user` or `theme`) is needed by deeply nested components.
- Passing props through every intermediate component becomes messy.

---

## Solution: `useContext` Hook + Context API

### 1. Create a Context (ThemeContext.js)
```jsx
// Create the context in a seperate file for reusability.
import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export default ThemeContext;
```

### 2. Provide the Context (Parent Level - App.jsx)

```jsx
// Provide the context at the root (parent component).
import React from "react";
import ThemeContext from "./ThemeContext";
import NestedComponent from "./NestedComponent";

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <h1>React Context Example</h1>
      <NestedComponent />
    </ThemeContext.Provider>
  );
}

export default App;

```

### 3. Nested Child (NestedComponent.jsx)
```jsx
import React from "react";
import Button from "./Button";

function NestedComponent() {
  return (
    <div>
      <p>I am a nested component</p>
      <Button />
    </div>
  );
}

export default NestedComponent;

```

### 4. Consume with useContext (Child Level - Button.jsx)
```jsx
import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

function Button() {
  const theme = useContext(ThemeContext);
  return <button>{theme} mode</button>;
}

export default Button;


```

##  Key Points

- useContext lets you access context values without passing props manually.

- Useful for global data like:

  - Theme (light/dark)

  - User authentication

  - Language settings

- Eliminates prop drilling.