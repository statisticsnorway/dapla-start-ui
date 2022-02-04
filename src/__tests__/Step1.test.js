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

  userEvent.type(container.querySelector('input'), 'Test')

  expect(container.querySelector('input')).toHaveValue('Team Test')

  expect(getByText(UI.NEXT).closest('button')).not.toBeDisabled()

  userEvent.click(getByText(UI.NEXT))
})

test('Required user input forces Team prefix', () => {
  const { container } = setup()

  userEvent.type(container.querySelector('input'), '{backspace}')

  expect(container.querySelector('input')).toHaveValue('Team Team')
})

test('User input approaching max character length changes color to rgb(255, 87, 87)', () => {
  const { container, getByText } = setup()

  userEvent.type(container.querySelector('input'), 'A Long Name For This')

  expect(getByText(`(20 / ${WIZARD.TEAM_NAME.max_chars})`)).toBeInTheDocument()
  expect(getByText(`(20 / ${WIZARD.TEAM_NAME.max_chars})`)).toHaveStyle('color: rgb(204, 137, 37)')
})

test('User input exceeding max character length changes color to rgb(255, 87, 87)', () => {
  const { container, getByText } = setup()

  userEvent.type(container.querySelector('input'), 'Test A Very Long Name Thing For This Test')

  expect(getByText(`(41 / ${WIZARD.TEAM_NAME.max_chars})`)).toBeInTheDocument()
  expect(getByText(`(41 / ${WIZARD.TEAM_NAME.max_chars})`)).toHaveStyle('color: rgb(255, 87, 87)')
})
