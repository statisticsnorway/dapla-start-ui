import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step0 } from '../components/steps'
import { STEPS, UI } from '../enum'

jest.mock('../components/FAQAccordion', () => () => null)

const setup = () => {
  const { getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/']}>
        <Step0 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  expect(getByText(STEPS[0].pageTitle)).toBeInTheDocument()
})

test('Navigates to next step', () => {
  const { getByText } = setup()

  userEvent.click(getByText(UI.START))
})
