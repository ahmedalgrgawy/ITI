import About from './components/About'
import Contact from './components/Contact'
import Eduction from './components/Eduction'
import Experience from './components/Experience'
import Img from './components/Img'
import Skills from './components/Skills'
import './index.css'

function App() {

  return (
    <div className='py-10 px-20'>
      <fieldset className='border-8 border-black'>
        <legend className='text-center mb-28'>
          <h1 className='text-5xl font-bold '>Ahmed<br />Algrgawy<br /></h1>
        </legend>
        <div className='flex items-center justify-between gap-8'>
          <div className='flex flex-col gap-4 w-[50%]'>
            <About />
            <Eduction />
            <Experience />
          </div>
          <div className='flex flex-col gap-4 w-[50%]'>
            <Img />
            <Contact />
            <Skills />
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default App
