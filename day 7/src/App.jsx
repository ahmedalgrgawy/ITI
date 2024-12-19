
import { Coins } from './components/Coins'
import { Toggler } from './components/Toggler'
import './index.css'

function App() {

  return (
    <div className='py-10 px-20 bg-[#eee] flex flex-col items-center gap-20'>
      <Coins />
      <Toggler />
    </div>
  )
}

export default App
