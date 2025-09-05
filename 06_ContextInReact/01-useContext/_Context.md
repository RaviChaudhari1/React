# React Context Summary

React Context is used to manage and share state globally across components without the need for prop drilling.

---

## 1. Creating a Context (like a global variable)
**File: `UserContext.js`**
```js
import React from "react";

const UserContext = React.createContext();

export default UserContext;
```

## 2. Context as a Provider
Every context needs a **Provider** which makes values available to all child components.  
In our case, the child component is `App.jsx`, which will be wrapped by the Provider.  
**File: `UserContextProvider.jsx`**
```jsx
import React from "react";
import UserContext from "./UserContext.js";

const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

```

## 3. Wrapping Components with Context Provider

The provider makes context values accessible to all components wrapped inside it.

**File: `App.jsx`**

```jsx
import './App.css'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'

function App() {
  return (
    <UserContextProvider>
      <h1>React with Chai and share is important</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  );
}

export default App;

```

## 4. Accessing Context Values with useContext Hook
Login Component (sets context values)

**File: `Login.jsx`**
```jsx
import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({ username, password });
    };

    return (
        <div>
            <h2>Login</h2>
            <input 
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='username'
            />
            {" "}
            <input 
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Login;

```

### Profile Component (reads context values)
**File: `Profile.jsx`**

```jsx
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

function Profile() {
    const { user } = useContext(UserContext);

    if (!user) return <div>Please login</div>;

    return <div>Welcome {user.username}</div>;
}

export default Profile;

```


## 🔑 Key Points

- React.createContext() creates a global context.
- A Provider wraps child components and passes values.
- Values are accessed using the useContext hook.
- Prevents prop drilling and makes state management easier.

## ❓ Q&A Section


### Do we need a Provider in App.jsx if we are already accessing values in components using Context?

Answer:

- React.createContext() only creates an empty container for values.
- Without a Provider, components using useContext will always receive the default value (in this case, undefined).
- The Provider is what actually supplies the values (user, setUser) to the components inside it.