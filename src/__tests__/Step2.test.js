import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { Step2 } from '../components/steps'
import { AppContextProvider } from '../context/AppContext'
import { TEST_CONFIGURATIONS } from '../configurations'
import { STEPS, TEST_IDS, UI, WIZARD } from '../enums'

const { language } = TEST_CONFIGURATIONS

const setup = () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/']}>
        <Step2 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText, getByPlaceholderText, getByTestId }
}

test('Renders correctly', () => {
  const { getByText, getByPlaceholderText, getByTestId } = setup()

  expect(getByText(STEPS.team.header)).toBeInTheDocument()
  expect(getByPlaceholderText(WIZARD.teamName.title)).toBeInTheDocument()
  expect(getByPlaceholderText(WIZARD.manager.title)).toBeInTheDocument()
  expect(getByTestId(TEST_IDS.DPO_DROPDOWN)).toBeInTheDocument()
  expect(getByTestId(TEST_IDS.DEVELOPER_DROPDOWN)).toBeInTheDocument()
  expect(getByTestId(TEST_IDS.CONSUMER_DROPDOWN)).toBeInTheDocument()
})

test('Editing values works correctly', () => {
  const { getByText, getByPlaceholderText, getByTestId } = setup()

  userEvent.type(getByPlaceholderText(WIZARD.teamName.title), 'test-team')
  expect(getByPlaceholderText(WIZARD.teamName.title)).toHaveValue('test-team')

  userEvent.type(getByPlaceholderText(WIZARD.manager.title), 'test-manager@test.com')
  expect(getByPlaceholderText(WIZARD.manager.title)).toHaveValue('test-manager@test.com')

  userEvent.type(getByTestId(TEST_IDS.DPO_DROPDOWN).children[0], 'test-dpo@test.com')
  userEvent.click(getByText(UI.ADD[language]))
  expect(getByTestId(TEST_IDS.DPO_DROPDOWN).children[0]).toHaveTextContent('test-dpo@test.com')

  userEvent.type(getByTestId(TEST_IDS.DEVELOPER_DROPDOWN).children[0], 'test-developer@test.com')
  userEvent.click(getByText(UI.ADD[language]))
  expect(getByTestId(TEST_IDS.DEVELOPER_DROPDOWN).children[0]).toHaveTextContent('test-developer@test.com')

  userEvent.type(getByTestId(TEST_IDS.CONSUMER_DROPDOWN).children[0], 'test-consumer@test.com')
  userEvent.click(getByText(UI.ADD[language]))
  expect(getByTestId(TEST_IDS.CONSUMER_DROPDOWN).children[0]).toHaveTextContent('test-consumer@test.com')
})