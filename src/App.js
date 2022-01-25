import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Steps } from 'primereact/steps'
import { Image } from 'primereact/image'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import './App.css'

import dapla_logo from './svg/dapla-long-rgb.svg'
import { Step0, Step1, Step2, Step3, Step4, Step5 } from './components/steps'
import { IMAGE_ALT_TEXT, STEPS } from './enum'

function App () {
  let location = useLocation()
  let navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(0)

  const items = STEPS.map((step, index) => ({
    label: step.stepHeader,
    command: () => navigate(`/${index}`)
  }))

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveIndex(parseInt(location.pathname.replace(/\D/g, ''), 10))
    } else {
      setActiveIndex(0)
    }
  }, [location])

  return (
    <>
      {location.pathname !== '/5' &&
        <div className="p-3 mb-4 box shadow-3 flex">
          <div className="flex-shrink-0 pr-3">
            <Image src={dapla_logo} alt={IMAGE_ALT_TEXT.DAPLA_LOGO} width="130" />
          </div>
          <div className="flex-grow-1 align-self-center">
            <Steps model={items} activeIndex={activeIndex} readOnly={false} />
          </div>
        </div>
      }
      <Routes>
        <Route path="*" element={<Step0 />} />
        <Route path="/0" element={<Step0 />} />
        <Route path="/1" element={<Step1 />} />
        <Route path="/2" element={<Step2 />} />
        <Route path="/3" element={<Step3 />} />
        <Route path="/4" element={<Step4 />} />
        <Route path="/5" element={<Step5 />} />
      </Routes>
    </>
  )
}

export default App
