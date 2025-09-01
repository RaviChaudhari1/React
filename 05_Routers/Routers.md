# React Router DOM - Quick Guide

React Router DOM is a popular library for handling routing in React applications. It allows you to create multi-page experiences while keeping a single-page app structure.

---

## 1. Routing Approaches

### **A. Route Configuration (Array)**
```jsx
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
```
### **B. Route Configuration (JSX)**
```jsx
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

```

## 2. Layout & Outlet

Layout is a component used to wrap common elements like headers and footers. Outlet renders the matched child route.

```jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />  {/* Child routes render here */}
      <Footer />
    </>
  );
}

```

## 3. Link & NavLink

- `Link`: Navigate without full page reload.

- `NavLink`: Like Link but allows styling based on active route.

```jsx
import { Link, NavLink } from "react-router-dom";

<Link to="/about">About</Link>

<NavLink
  to="/contact"
  className={({ isActive }) =>
    isActive ? "text-orange-700" : "text-gray-700"
  }
>
  Contact
</NavLink>

```

## 4. Loader

Loaders allow fetching data before rendering the route component. Access the data via `useLoaderData()`.

```jsx
// Loader function - Github.jsx
export const fetchGithubData = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  return res.json();
};

// In the component - for accessing data from loader
import { useLoaderData } from "react-router-dom";

export default function Github() {
  const user = useLoaderData();
  return <div>{user.login}</div>;
}


// Route with loader - main.jsx
<Route 
  path="github" 
  element={<Github />} 
  loader={() => fetchGithubData("RaviChaudhari1")} 
/>

```

## 5. Dynamic Routes

You can create routes with parameters:

```jsx
<Route path="user/:userId" element={<User />} />

// Access parameter in component
import { useParams } from "react-router-dom";

const { userId } = useParams();

```


## 6. Summary

- Outlet: Renders child routes inside layout.
- Link / NavLink: Navigate between routes.
- Loader: Fetch data before component renders.
- Dynamic Routes: Use URL parameters to fetch/display data.
- Routing: Can be defined using an array of objects or JSX elements.