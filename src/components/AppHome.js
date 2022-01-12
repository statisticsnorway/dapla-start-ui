import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Divider, Icon, Step } from 'semantic-ui-react'

import { Step1, Step2, Step3, Step4 } from './steps'
import { STEPS } from '../enums'

function AppHome () {
  let location = useLocation()

  return (
    <>
      <Step.Group size="big" widths={4}>
        {Object.entries(STEPS).map(([key, step], index) =>
          <Step key={key} active={location.pathname === `/${index + 1}`} as={Link} to={`/${index + 1}`}>
            <Icon name={step.icon} />
            <Step.Content>
              <Step.Title>{step.header}</Step.Title>
              <Step.Description>{step.description}</Step.Description>
            </Step.Content>
          </Step>
        )}
      </Step.Group>
      <Divider hidden />
      <Routes>
        <Route path="*" element={<Step1 />} />
        <Route path="/1" element={<Step1 />} />
        <Route path="/2" element={<Step2 />} />
        <Route path="/3" element={<Step3 />} />
        <Route path="/4" element={<Step4 />} />
      </Routes>
    </>
  )
}

export default AppHome
