
import './App.css'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import  Profile  from './components/Profile';


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdatePassword from './components/UpdatePasssword';
import Preference from './components/Preference';
import CreateWaves from './components/CreateWaves';
import Friends from './components/Friends';
import InviteFriends from './components/InviteFriends';
import DynamicForm from './components/Form';

function App() {
  const router = createBrowserRouter([
    {path: '/Form', element: <DynamicForm />},
    { path: '/', element: <Signup /> },
    {path: '/login', element: <Login />},
    // {
    //   path: '*',
    //   element: localStorage.getItem('token') ? <Dashboard /> : <Login />,
    // },
    // {
    //   path: '/signup',  
    //   element: localStorage.getItem('token') ? <Dashboard /> : <Signup />,
    // },
    // {
    //   path: '/login',
    //   element: localStorage.getItem('token') ? <Dashboard /> : <Login />,
    // },
    {path: '/dashboard', element: <Dashboard />},
    {path: '/profile', element: <Profile />}, 
    {path: '/preferences', element: <Preference />},
    {path: '/friends', element: <Friends />},
    {path: '/waves', element: <CreateWaves />},
    {path: '/change-password', element: <UpdatePassword />},
    {path: '/invite-friends', element: <InviteFriends />},
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
