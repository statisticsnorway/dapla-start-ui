import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step1 } from '../components/steps'
import { UI, WIZARD } from '../content'

jest.mock('../components/ShowHideFAQ', () => () => null)

const setup = () => {
  const { container, getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/1']}>
        <Step1 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { container, getByText }
}

test('Required user input works correctly', () => {
  const { container, getByText } = setup()

  expect(getByText(UI.NEXT).closest('button')).toBeDisabled()

  userEvent.type(container.querySelector('input'), 'Team Test')

  expect(container.querySelector('input')).toHaveValue('Team Test')

  expect(getByText(UI.NEXT).closest('button')).not.toBeDisabled()

  userEvent.click(getByText(UI.NEXT))
})

test('User input has reached max character length changes color to rgb(255, 87, 87)', () => {
  const { container, getByText } = setup()

  userEvent.type(container.querySelector('input'), 'A Very Long Name Thing')

  expect(container.querySelector('input')).toHaveValue('A Very Long Name T')

  expect(getByText(`(18 / ${WIZARD.TEAM_NAME.max_chars} ${UI.CHARS})`)).toBeInTheDocument()
  expect(getByText(`(18 / ${WIZARD.TEAM_NAME.max_chars} ${UI.CHARS})`)).toHaveStyle('color: rgb(255, 87, 87)')

})
