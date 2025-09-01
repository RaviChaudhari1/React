import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import {About, Contact, Home, Github, User} from './components/index.js'
import { fetchGithubData } from './components/Github.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: '',
//         element: <Home/>
//       },
//       {
//         path: 'about',
//         element: <About/>
//       },
//       {
//         path: 'contact',
//         element: <Contact/>
//       },
//       {
//         path: 'github',
//         element: <Github/>
//       },
//       {
//         path: 'user/:userId',
//         element: <User/>
//       }
//     ]
//   }
// ])

const username = "RaviChaudhari1"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route 
      path='github' 
      element={<Github username={username}/>}
      loader={
        () => fetchGithubData(username) // it can also take an callback function () => {}
      }
      />
      <Route path='user/:userId' element={<User/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
