
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
// import { createBrowserRouter, RouterProvider } from 
import Login from './Components/Login';
// import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';


function App() {

  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    // { path: '/signup', element: <Signup /> },
    { path: '/', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/profile', element: <Profile /> }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
