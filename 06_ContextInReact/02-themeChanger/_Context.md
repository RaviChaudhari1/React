# React Theme Context with Tailwind Dark Mode

This setup shows how to create a **Theme Context** with `useTheme` hook, use it across components, and manually toggle **dark mode** with Tailwind.

---

## 1️⃣ Creating Context and Provider

**File: `ThemeContext.js`**

- Context is created with default values.
- Export the **Provider**.
- A custom hook `useTheme()` is made for easy value access.

```js
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    lightMode: () => {},
    darkMode: () => {}
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
    return useContext(ThemeContext);
}
```

## 2️⃣ Using the Provider in `App.jsx`

Wrap your app with ThemeProvider and pass values (`themeMode`, `lightMode`, `darkMode`).
```jsx
import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeBtn from "./components/ThemeBtn";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightMode = () => {
    setThemeMode("light");
    document.documentElement.classList.remove("dark");
  };

  const darkMode = () => {
    setThemeMode("dark");
    document.documentElement.classList.add("dark");
  };

  return (
    <ThemeProvider value={{ themeMode, lightMode, darkMode }}>
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <h1 className="text-2xl font-bold">React + Tailwind Dark Mode</h1>
        <ThemeBtn />
      </div>
    </ThemeProvider>
  );
}

export default App;

```

## 3️⃣ Accessing Values using useTheme

Destructure values directly with `useTheme()` inside components.

**File: `ThemeBtn.jsx`**
```jsx
import React from "react";
import useTheme from "../contexts/ThemeContext";

export default function ThemeBtn() {
  const { themeMode, lightMode, darkMode } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkMode();
    } else {
      lightMode();
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer ml-5">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
        peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border-gray-300 after:border after:rounded-full
        after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full">
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-200">
        Toggle Theme
      </span>
    </label>
  );
}

```

## 4️⃣ Tailwind Dark Mode Configuration

Enable manual class-based dark mode toggle for changing theme based on class.

```html
<html class="light/dark">
....
</html>
```

**File: `index.css`**

```css
@import "tailwindcss";

/* for toggling theme based on class="light/dark" */
@custom-variant dark (&:where(.dark, .dark *));


 ```

## 5️⃣ How It Activates

When you toggle `<html class="dark">`, all `dark:` prefixed utilities become active.

```html
<html class="dark">
  <body class="bg-white dark:bg-black text-black dark:text-white">
    <h1>Hello World</h1>
  </body>
</html>

```