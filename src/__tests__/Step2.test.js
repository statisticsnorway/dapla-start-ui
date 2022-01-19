import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { Step2 } from '../components/steps'
import { AppContextProvider } from '../context/AppContext'
import { TEST_CONFIGURATIONS } from '../configurations'
import { STEPS, TEST_IDS, UI } from '../enums'

const { language } = TEST_CONFIGURATIONS

const setup = () => {
  const { getByText, getByTestId, getAllByPlaceholderText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/']}>
        <Step2 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText, getByTestId, getAllByPlaceholderText }
}

test('Renders correctly', () => {
  const { getByText, getAllByPlaceholderText, getByTestId } = setup()

  expect(getByText(STEPS.team.header)).toBeInTheDocument()
  expect(getAllByPlaceholderText(UI.EMAIL_PLACEHOLDER)).toHaveLength(2)
  expect(getByTestId(TEST_IDS.DPO_DROPDOWN)).toBeInTheDocument()
  expect(getByTestId(TEST_IDS.DEVELOPER_DROPDOWN)).toBeInTheDocument()
  expect(getByTestId(TEST_IDS.CONSUMER_DROPDOWN)).toBeInTheDocument()
})

test('Editing values works correctly', () => {
  const { getByText, getByTestId } = setup()

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
