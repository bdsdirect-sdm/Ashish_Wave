
import './App.css'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import  Profile  from './components/Profile';


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdatePassword from './components/UpdatePasssword';
// import WaveInfo from './components/WaveInfo';
// import WavesList from './components/WavesList';
import Preference from './components/Preference';
import CreateWaves from './components/CreateWaves';
import Friends from './components/Friends';
import InviteFriends from './components/InviteFriends';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Signup /> },
    {path: '/login', element: <Login />},
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
