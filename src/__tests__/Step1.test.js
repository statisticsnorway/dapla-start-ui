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

test('Required user input works correctly', async () => {
  const { container, getByText } = setup()

  expect(getByText(UI.NEXT).closest('button')).toBeDisabled()

  await userEvent.type(container.querySelectorAll('input')[0], 'Sultry Scallywags')

  expect(container.querySelectorAll('input')[0]).toHaveValue('Sultry Scallywags')

  expect(getByText(UI.NEXT).closest('button')).not.toBeDisabled()

  await userEvent.click(getByText(UI.NEXT))
})

test('User input has reached max character length changes color to rgb(204, 137, 37)', async () => {
  const { container, getByText } = setup()

  await userEvent.type(container.querySelectorAll('input')[0], 'Tremendous Scallywags')

  expect(container.querySelectorAll('input')[0]).toHaveValue('Tremendous Scally')

  expect(getByText(`(17 / ${WIZARD.UNIFORM_TEAM_NAME.max_chars} ${UI.CHARS})`)).toBeInTheDocument()
  expect(getByText(`(17 / ${WIZARD.UNIFORM_TEAM_NAME.max_chars} ${UI.CHARS})`)).toHaveStyle('color: rgb(204, 137, 37)')
})

test('User overriding uniform team name works correctly', async () => {
  const { container, getByText } = setup()

  await userEvent.type(container.querySelectorAll('input')[0], 'Sultry Scallywags')
  await userEvent.click(getByText(UI.OVERRIDE))

  expect(container.querySelectorAll('input')[2]).toHaveValue('sultry-scallywags')

  await userEvent.type(container.querySelectorAll('input')[2], '{Backspace}{Backspace}ys')

  expect(getByText('sultry-scallyways')).toBeInTheDocument()
})

test('Reset uniform team name override works correctly', async () => {
  const { container, getByText } = setup()

  await userEvent.type(container.querySelectorAll('input')[0], 'Sultry Scallywags')
  await userEvent.click(getByText(UI.OVERRIDE))
  await userEvent.type(container.querySelectorAll('input')[2], '{Backspace}{Backspace}ys')
  await userEvent.click(getByText(UI.OVERRIDE))

  expect(getByText('sultry-scallywags')).toBeInTheDocument()
})

test('User override has reached max character length changes color to rgb(204, 137, 37)', async () => {
  const { container, getByText } = setup()

  await userEvent.type(container.querySelectorAll('input')[0], 'Tremendous Scallywags')
  await userEvent.click(getByText(UI.OVERRIDE))

  expect(container.querySelectorAll('input')[2]).toHaveValue('tremendous-scally')

  await userEvent.type(container.querySelectorAll('input')[2], 'wags')

  expect(container.querySelectorAll('input')[2]).toHaveValue('tremendous-scally')

  expect(getByText(`(17 / ${WIZARD.UNIFORM_TEAM_NAME.max_chars} ${UI.CHARS})`)).toBeInTheDocument()
  expect(getByText(`(17 / ${WIZARD.UNIFORM_TEAM_NAME.max_chars} ${UI.CHARS})`)).toHaveStyle('color: rgb(204, 137, 37)')
})
