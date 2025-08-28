# How React Works

1. **JSX → React Element**
 - JSX is converted by **Babel** into `React.createElement`.
 - This creates a **plain JS object** (React element), not a DOM node.

```jsx
  const element = <h1>Hello World</h1>;

  // What Babel does
  const element = React.createElement("h1", null, "Hello World");

  // Which is generally just an object
  {
  type: "h1",
  props: { children: "Hello World" }
  }

  //👉 So React elements are plain JavaScript objects describing the UI.

```

2. **ReactDOM.render**
 - Takes the element object.
 - Creates real DOM nodes.
 - Inserts into the page (`#root`).

   ```jsx
     ReactDOM.render(element, document.getElementById("root"));
     // This creates a real <h1>Hello World</h1> inside #root.
   ```

3. **Components**
 - Functions or classes that **return React elements**.
 - Example:  
     ```jsx
        function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
        }

        const app = <Welcome name="Ravi" />;
        ReactDOM.render(app, document.getElementById("root"));

        // 👉 Welcome is called with { name: "Ravi" } and returns a React element.

     ```

4. **Virtual DOM**
 - React keeps a **virtual copy** of the UI in memory.
 - On state/prop change:
     - Builds a new virtual tree.
     - Diffs with the old tree.
     - Updates only changed parts in the real DOM.

     ```jsx
        import React, { useState } from "react";
        import ReactDOM from "react-dom";

        function Counter() {
        const [count, setCount] = useState(0);

        return (
            <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            </div>
        );
        }

        ReactDOM.render(<Counter />, document.getElementById("root"));

        // 👉 When setCount is called:
        // React makes a new virtual tree.
        // Sees only <h1> text changed.
        // Updates just that node in the real DOM.

     ```

5. **Reconciliation**
#### Reconciliation is the process React uses to update the DOM efficiently:
 - Compares the old virtual tree with the new virtual tree.
 - Applies the minimum number of changes to the real DOM.
 - Uses rules like:
   - If the element type is the same → update attributes/props.
   - If the element type is different → destroy old node, create a new one.
   - Keys help React track list items efficiently.

5. **Fiber (React Core)**
 - React’s engine (Fiber) makes rendering smooth:
 - Splits rendering into small units of work.
 - Can pause/resume/restart rendering.
 - Prioritizes important updates (like user typing).
 - Enables features like concurrent rendering, Suspense, transitions.


6. **Role of Babel**
 - Transforms JSX → React.createElement calls.
 - Lets you use modern JavaScript features.
 - Makes code browser-compatible.

---

```
    ✅ In short: JSX → Babel → React.createElement → React Element (object)
   → Virtual DOM → Diffing → Real DOM updates

```

