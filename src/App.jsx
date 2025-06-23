import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SendEmailForm from './components/SendEmail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SendEmailForm/>
    </>
  )
}

export default App
