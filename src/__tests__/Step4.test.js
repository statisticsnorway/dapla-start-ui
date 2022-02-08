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
    [WIZARD.MANAGER.ref]: [{
      [API.MEMBER_OBJECT.NAME]: 'Manager',
      [API.MEMBER_OBJECT.EMAIL_SHORT]: 'man@ssb.no',
      [API.MEMBER_OBJECT.EMAIL]: 'Manager@ssb.no'
    }],
    [WIZARD.DATA_ADMINS.ref]: [{
      [API.MEMBER_OBJECT.NAME]: 'Data Admin',
      [API.MEMBER_OBJECT.EMAIL_SHORT]: 'dad@ssb.no',
      [API.MEMBER_OBJECT.EMAIL]: 'Data.Admin@ssb.no'
    }],
    [WIZARD.DEVELOPERS.ref]: [{
      [API.MEMBER_OBJECT.NAME]: 'Developer',
      [API.MEMBER_OBJECT.EMAIL_SHORT]: 'dev@ssb.no',
      [API.MEMBER_OBJECT.EMAIL]: 'Developer@ssb.no'
    }],
    [WIZARD.CONSUMERS.ref]: [{
      [API.MEMBER_OBJECT.NAME]: 'Consumer',
      [API.MEMBER_OBJECT.EMAIL_SHORT]: 'con@ssb.no',
      [API.MEMBER_OBJECT.EMAIL]: 'Consumer@ssb.no'
    }],
    [WIZARD.OTHER_INFO.ref]: '',
    [WIZARD.SERVICES.ref]: ['transfer_service'],
    ui_version: process.env.REACT_APP_VERSION
  }
}
const emptyTestWizardData = {
  wizard: {
    [WIZARD.TEAM_NAME.ref]: '',
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
  useAxios.mockReturnValue([{ loading: false, error: null }, execute])

  const { getByText } = setup()

  expect(getByText(STEPS[4].pageTitle)).toBeInTheDocument()
})

test('Renders correctly on empty context', () => {
  useWizardContext.mockImplementation(() => emptyTestWizardData)
  useAxios.mockReturnValue([{ loading: false, error: null }, execute])

  const { getByText } = setup()

  expect(getByText(STEPS[4].pageTitle)).toBeInTheDocument()
})

test('Navigates to next step', () => {
  useWizardContext.mockImplementation(() => testWizardData)
  useAxios.mockReturnValue([{ loading: false, error: null }, execute])
  execute.mockResolvedValue({ data: { key: 'DS-1' } })

  const { getByText } = setup()

  userEvent.click(getByText(UI.COMPLETE))

  expect(execute).toHaveBeenCalled()
})

test('Error handling works correctly', () => {
  class ErrorClass {
    object = { name: 'Error', message: 'Network error', status: null }

    toJSON () {
      return this.object
    }
  }

  const errorMessage = new ErrorClass()

  useWizardContext.mockImplementation(() => testWizardData)
  useAxios.mockReturnValue([{ loading: false, error: errorMessage, data: null }, execute])

  const { getByText } = setup()

  expect(getByText('Error: Network error')).toBeInTheDocument()
})

test('Error response handling works correctly', () => {
  const errorMessage = { response: { data: { detail: 'Something went wrong!' } } }

  useWizardContext.mockImplementation(() => testWizardData)
  useAxios.mockReturnValue([{ loading: false, error: errorMessage, data: null }, execute])

  const { getByText } = setup()

  expect(getByText('Something went wrong!')).toBeInTheDocument()
})

test('Try again after error works correctly', () => {
  const errorMessage = { response: { data: { detail: 'Something went wrong!' } } }

  useWizardContext.mockImplementation(() => testWizardData)
  useAxios.mockReturnValueOnce([{ loading: false, error: errorMessage, data: null }, execute])
    .mockReturnValueOnce([{ loading: false, error: null, data: null }, execute])
  execute.mockResolvedValue({ data: { key: 'DS-1' } })

  const { getByText } = setup()

  userEvent.click(getByText(UI.TRY_AGAIN))

  expect(execute).toHaveBeenCalled()
})
