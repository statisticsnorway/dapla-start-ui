import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider, useWizardContext, useWizardOverrideContext } from '../context/AppContext'
import { Step5 } from '../components/steps'
import { API } from '../configurations'
import { STEPS, UI, WIZARD } from '../content'

jest.mock('../context/AppContext', () => {
  const actualThing = jest.requireActual('../context/AppContext')
  return {
    ...actualThing,
    useWizardContext: jest.fn(),
    useWizardOverrideContext: jest.fn()
  }
})

const execute = jest.fn()
const testWizardData = {
  wizard: {
    [WIZARD.TEAM_NAME.ref]: 'Sultry Scallywags',
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
    [WIZARD.OTHER_INFO.ref]: '',
    [WIZARD.ORG_INFO.ref]: {
      [API.ORG_INFO_OBJECT.CODE]: '10',
      [API.ORG_INFO_OBJECT.NAME]: 'Seksjon 10',
      [API.ORG_INFO_OBJECT.PARENT_CODE]: '1'
    },
    [WIZARD.SERVICES.ref]: ['transfer_service'],
    ui_version: process.env.REACT_APP_VERSION
  }
}
const testWizardOverrideData = {
  wizardOverride: {
    [WIZARD.UNIFORM_TEAM_NAME.override]: false,
    [WIZARD.UNIFORM_TEAM_NAME.ref]: 'sultry-scallywags'
  }
}
const testWizardOverrideDataOverride = {
  wizardOverride: {
    [WIZARD.UNIFORM_TEAM_NAME.override]: true,
    [WIZARD.UNIFORM_TEAM_NAME.ref]: 'sultry-scallyways'
  }
}
const emptyTestWizardData = {
  wizard: {
    [WIZARD.TEAM_NAME.ref]: '',
    [WIZARD.MANAGER.ref]: null,
    [WIZARD.DATA_ADMINS.ref]: null,
    [WIZARD.DEVELOPERS.ref]: null,
    [WIZARD.OTHER_INFO.ref]: '',
    [WIZARD.ORG_INFO.ref]: null,
    [WIZARD.SERVICES.ref]: null,
    ui_version: process.env.REACT_APP_VERSION
  }
}

const setup = () => {
  const { getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/5']}>
        <Step5 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  useWizardContext.mockImplementation(() => testWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideData)
  useAxios.mockReturnValue([{ loading: false, error: null }, execute])

  const { getByText } = setup()

  expect(getByText(STEPS[5].pageTitle)).toBeInTheDocument()
})

test('Renders correctly on empty context', () => {
  useWizardContext.mockImplementation(() => emptyTestWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideData)
  useAxios.mockReturnValue([{ loading: false, error: null }, execute])

  const { getByText } = setup()

  expect(getByText(STEPS[5].pageTitle)).toBeInTheDocument()
})

test('Navigates to next step', async () => {
  useWizardContext.mockImplementation(() => testWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideData)
  useAxios.mockReturnValue([{ loading: false, error: null }, execute])
  execute.mockResolvedValue({ data: { key: 'DS-1' } })

  const { getByText } = setup()

  await userEvent.click(getByText(UI.COMPLETE))

  expect(execute).toHaveBeenCalled()
})

test('Navigates to next step if uniform team name is overridden', async () => {
  useWizardContext.mockImplementation(() => testWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideDataOverride)
  useAxios.mockReturnValue([{ loading: false, error: null }, execute])
  execute.mockResolvedValue({ data: { key: 'DS-1' } })

  const { getByText } = setup()

  await userEvent.click(getByText(UI.COMPLETE))

  expect(execute).toHaveBeenCalled()
  expect(execute).toHaveBeenCalledWith({
    data:
    {
      ...testWizardData.wizard,
      [WIZARD.UNIFORM_TEAM_NAME.ref]: testWizardOverrideDataOverride.wizardOverride[WIZARD.UNIFORM_TEAM_NAME.ref]
    },
    url: `${window.__ENV.REACT_APP_API}${API.CREATE_JIRA}`
  })
})

test('Error handling works correctly', () => {
  class ErrorClass {
    object = { name: 'Error', message: 'Network error', status: null }

    toJSON() {
      return this.object
    }
  }

  const errorMessage = new ErrorClass()

  useWizardContext.mockImplementation(() => testWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideData)
  useAxios.mockReturnValue([{ loading: false, error: errorMessage, data: null }, execute])

  const { getByText } = setup()

  expect(getByText('Error: Network error')).toBeInTheDocument()
})

test('Error response handling works correctly', () => {
  const errorMessage = { response: { data: { detail: 'Something went wrong!' } } }

  useWizardContext.mockImplementation(() => testWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideData)
  useAxios.mockReturnValue([{ loading: false, error: errorMessage, data: null }, execute])

  const { getByText } = setup()

  expect(getByText('Something went wrong!')).toBeInTheDocument()
})

test('Error array response data handling works correctly', () => {
  const errorMessage = { response: { data: { detail: [{ loc: 69, msg: 'Not a valid dict!' }] } } }

  useWizardContext.mockImplementation(() => testWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideData)
  useAxios.mockReturnValue([{ loading: false, error: errorMessage, data: null }, execute])

  const { getByText } = setup()

  expect(getByText('[ { "loc": 69, "msg": "Not a valid dict!" } ]')).toBeInTheDocument()
})

test('Try again after error works correctly', async () => {
  const errorMessage = { response: { data: { detail: 'Something went wrong!' } } }

  useWizardContext.mockImplementation(() => testWizardData)
  useWizardOverrideContext.mockImplementation(() => testWizardOverrideData)
  useAxios.mockReturnValueOnce([{ loading: false, error: errorMessage, data: null }, execute])
    .mockReturnValueOnce([{ loading: false, error: null, data: null }, execute])
  execute.mockResolvedValue({ data: { key: 'DS-1' } })

  const { getByText } = setup()

  await userEvent.click(getByText(UI.TRY_AGAIN))

  expect(execute).toHaveBeenCalled()
})
