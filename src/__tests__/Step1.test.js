import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step1 } from '../components/steps'
import { UI, WIZARD } from '../enum'

jest.mock('../components/ShowHideFAQ', () => () => null)

const setup = () => {
  const { getByPlaceholderText, getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/1']}>
        <Step1 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByPlaceholderText, getByText }
}

test('User input works correctly', () => {
  const { getByPlaceholderText } = setup()

  userEvent.type(getByPlaceholderText(WIZARD.TEAM_NAME.placeholder), 'Team Test')

  expect(getByPlaceholderText(WIZARD.TEAM_NAME.placeholder)).toHaveValue('Team Test')
})

test('Navigates to next step', () => {
  const { getByText } = setup()

  userEvent.click(getByText(UI.NEXT))
})
