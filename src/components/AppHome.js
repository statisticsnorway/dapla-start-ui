import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Divider, Icon, Image, Segment, Step } from 'semantic-ui-react'
import { dapla_long_rgb } from '@statisticsnorway/dapla-js-utilities'

import { Step1, Step2, Step3, Step4 } from './steps'
import { STEPS } from '../enums'

function AppHome () {
  let location = useLocation()

  return (
    <Segment basic>
      {location.pathname !== '/4' &&
        <Step.Group size="large" widths={4}>
          {Object.entries(STEPS).slice(0, -1).map(([key, step], index) =>
            <Step
              key={key}
              as={Link}
              to={`/${index + 1}`}
              active={location.pathname === `/${index + 1}` || (location.pathname === '/' && index === 0)}
            >
              {index !== 0 ?
                <Icon name={step.icon} />
                :
                <Image size="tiny" src={dapla_long_rgb} style={{ marginRight: '1rem' }} />
              }
              <Step.Content>
                <Step.Title>{step.header}</Step.Title>
                <Step.Description>{step.description}</Step.Description>
              </Step.Content>
            </Step>
          )}
        </Step.Group>
      }
      <Divider hidden />
      <Routes>
        <Route path="*" element={<Step1 />} />
        <Route path="/1" element={<Step1 />} />
        <Route path="/2" element={<Step2 />} />
        <Route path="/3" element={<Step3 />} />
        <Route path="/4" element={<Step4 />} />
      </Routes>
    </Segment>
  )
}

export default AppHome
