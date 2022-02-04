import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider, useWizardContext } from '../context/AppContext'
import { Step4 } from '../components/steps'
import { API } from '../configurations'
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
    [WIZARD.MANAGER.ref]: [{ [API.MEMBER_OBJECT.NAME]: 'Manager', [API.MEMBER_OBJECT.EMAIL]: 'man@ssb.no' }],
    [WIZARD.DATA_ADMINS.ref]: [{
      [API.MEMBER_OBJECT.NAME]: 'Data Admin',
      [API.MEMBER_OBJECT.EMAIL]: 'dad@ssb.no'
    }],
    [WIZARD.DEVELOPERS.ref]: [{ [API.MEMBER_OBJECT.NAME]: 'Developer', [API.MEMBER_OBJECT.EMAIL]: 'dev@ssb.no' }],
    [WIZARD.CONSUMERS.ref]: [{ [API.MEMBER_OBJECT.NAME]: 'Consumer', [API.MEMBER_OBJECT.EMAIL]: 'con@ssb.no' }],
    [WIZARD.OTHER_INFO.ref]: '',
    [WIZARD.SERVICES.ref]: ['transfer_service'],
    ui_version: process.env.REACT_APP_VERSION
  }
}
const testWizardDataEmpty = {
  wizard: {
    [WIZARD.TEAM_NAME.ref]: 'Team ',
    [WIZARD.MANAGER.ref]: null,
    [WIZARD.DATA_ADMINS.ref]: null,
    [WIZARD.DEVELOPERS.ref]: null,
    [WIZARD.CONSUMERS.ref]: null,
    [WIZARD.OTHER_INFO.ref]: '',
    [WIZARD.SERVICES.ref]: null,
    ui_version: process.env.REACT_APP_VERSION
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
