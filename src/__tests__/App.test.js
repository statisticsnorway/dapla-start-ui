import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from '../App'
import { AppContextProvider } from '../context/AppContext'
import { STEPS } from '../content'

jest.mock('../components/steps/Step0', () => () => null)
jest.mock('../components/steps/Step1', () => () => null)
jest.mock('../components/steps/Step2', () => () => null)
jest.mock('../components/steps/Step3', () => () => null)
jest.mock('../components/steps/Step4', () => () => null)
jest.mock('../components/steps/Step5', () => () => null)

const setup = () => {
  const { getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  STEPS.forEach(step => expect(getByText(step.stepHeader)).toBeInTheDocument())
})

test('Navigages correctly', () => {
  const { getByText } = setup()

  userEvent.click(getByText(STEPS[1].stepHeader))

  expect(getByText(STEPS[1].stepHeader).closest('a')).toHaveFocus()
})
