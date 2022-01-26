import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step1 } from '../components/steps'
import { UI, WIZARD } from '../content'

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

test('Required user input works correctly', () => {
  const { getByPlaceholderText, getByText } = setup()

  expect(getByText(UI.NEXT).closest('button')).toBeDisabled()

  userEvent.type(getByPlaceholderText(WIZARD.TEAM_NAME.placeholder), 'Team Test')

  expect(getByPlaceholderText(WIZARD.TEAM_NAME.placeholder)).toHaveValue('Team Test')

  expect(getByText(UI.NEXT).closest('button')).not.toBeDisabled()

  userEvent.click(getByText(UI.NEXT))
})
