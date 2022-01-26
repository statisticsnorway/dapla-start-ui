import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import Step2Form from '../components/steps/Step2Form'
import { STEP_2, UI, WIZARD } from '../content'

const setup = () => {
  const { getAllByPlaceholderText, getByPlaceholderText, getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/2']}>
        <Step2Form />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getAllByPlaceholderText, getByPlaceholderText, getByText }
}

test('Required user input works correctly', () => {
  const { getByPlaceholderText, getByText } = setup()

  expect(getByText(UI.NEXT).closest('button')).toBeDisabled()

  userEvent.type(getByPlaceholderText(WIZARD.MANAGER.placeholder), 'manager@ssb.no')

  expect(getByPlaceholderText(WIZARD.MANAGER.placeholder)).toHaveValue('manager@ssb.no')

  expect(getByText(UI.NEXT).closest('button')).not.toBeDisabled()

  userEvent.click(getByText(UI.NEXT))
})

test('User multi-input (Chips) works correctly', () => {
  const { getAllByPlaceholderText, getByText } = setup()

  STEP_2.FORM_FIELDS.forEach((value, index) => {
    userEvent.type(
      getAllByPlaceholderText(WIZARD[value].placeholder)[index],
      `${value}1@ssb.no{enter}${value}2@ssb.no{enter}`
    )

    expect(getByText(`${value}1@ssb.no`)).toBeInTheDocument()
    expect(getByText(`${value}2@ssb.no`)).toBeInTheDocument()
  })
})
