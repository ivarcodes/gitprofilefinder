import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Userprofile from './../Userprofile';
import ProfileSearch from './ProfileSearch';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProfileSearch/>

    </>
  )
}

export default App
