import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider, useWizardContext } from '../context/AppContext'
import { Step4 } from '../components/steps'
import { STEPS, UI, WIZARD } from '../content'

jest.mock('../context/AppContext', () => {
  const actualThing = jest.requireActual('../context/AppContext')
  return {
    ...actualThing,
    useWizardContext: jest.fn()
  }
})

const execute = jest.fn()
const testWizardData = {
  wizard: {
    [WIZARD.TEAM_NAME.ref]: 'Team Test',
    [WIZARD.MANAGER.ref]: 'manager@ssb.no',
    [WIZARD.DATA_PROTECTION_OFFICERS.ref]: ['dpo@ssb.no'],
    [WIZARD.DEVELOPERS.ref]: ['developer@ssb.no'],
    [WIZARD.CONSUMERS.ref]: ['consumer@ssb.no'],
    [WIZARD.SERVICES.ref]: ['transfer_service']
  }
}
const testWizardDataEmpty = {
  wizard: {
    [WIZARD.TEAM_NAME.ref]: '',
    [WIZARD.MANAGER.ref]: '',
    [WIZARD.DATA_PROTECTION_OFFICERS.ref]: null,
    [WIZARD.DEVELOPERS.ref]: null,
    [WIZARD.CONSUMERS.ref]: null,
    [WIZARD.SERVICES.ref]: null
  }
}

const setup = () => {
  const { getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/4']}>
        <Step4 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  useWizardContext.mockImplementation(() => testWizardData)
  useAxios.mockReturnValue([{ loading: false, error: undefined }, execute])

  const { getByText } = setup()

  expect(getByText(STEPS[4].pageTitle)).toBeInTheDocument()
})

test('Renders correctly on empty context', () => {
  useWizardContext.mockImplementation(() => testWizardDataEmpty)
  useAxios.mockReturnValue([{ loading: false, error: undefined }, execute])

  const { getByText } = setup()

  expect(getByText(STEPS[4].pageTitle)).toBeInTheDocument()
})

test('Navigates to next step', () => {
  useWizardContext.mockImplementation(() => testWizardData)
  useAxios.mockReturnValue([{ loading: false, error: undefined }, execute])
  execute.mockResolvedValue({ data: { key: 'DS-1' } })

  const { getByText } = setup()

  userEvent.click(getByText(UI.COMPLETE))
})
