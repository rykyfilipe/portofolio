import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Navbar/Navbar'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar clasName='headbar'/>
    <Navbar clasName='sidebar'/>
  </StrictMode>,
)
