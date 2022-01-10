import { useContext, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Divider, Icon, Step } from 'semantic-ui-react'

import { Step1, Step2, Step3, Step4 } from './steps'
import { LanguageContext } from '../context/AppContext'

function AppHome () {
  const { language } = useContext(LanguageContext)

  let location = useLocation()

  useEffect(() => {
   console.log(location)
  }, [location])

  return (
    <>
      <Step.Group size="big" widths={4}>
        <Step active={location.pathname === '/1'} as={Link} to="/1">
          <Icon name="info" />
          <Step.Content>
            <Step.Title>Velkommen</Step.Title>
            <Step.Description>Hva er dette?</Step.Description>
          </Step.Content>
        </Step>

        <Step active={location.pathname === '/2'} as={Link} to="/2">
          <Icon name="users" />
          <Step.Content>
            <Step.Title>Team</Step.Title>
            <Step.Description>Teamnavn osv, konstellasjon stuff</Step.Description>
          </Step.Content>
        </Step>

        <Step active={location.pathname === '/3'} as={Link} to="/3">
          <Icon name="cogs" />
          <Step.Content>
            <Step.Title>Tjenester</Step.Title>
            <Step.Description>bøtter, transfer-service osv.</Step.Description>
          </Step.Content>
        </Step>

        <Step active={location.pathname === '/4'} as={Link} to="/4">
          <Icon name="clipboard list" />
          <Step.Content>
            <Step.Title>Oppsummering</Step.Title>
            <Step.Description>Bekreftelser og output</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      <Divider hidden />

      <Routes>
        <Route path="/1" element={<Step1 />} />
        <Route path="/2" element={<Step2 />} />
        <Route path="/3" element={<Step3 />} />
        <Route path="/4" element={<Step4 />} />
      </Routes>
    </>
  )
}

export default AppHome
