import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import Step2Form from '../components/steps/Step2Form'
import { STEP_2, UI, WIZARD } from '../enum'

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

test('User input works correctly', () => {
  const { getByPlaceholderText } = setup()

  userEvent.type(getByPlaceholderText(WIZARD.MANAGER.placeholder), 'manager@ssb.no')

  expect(getByPlaceholderText(WIZARD.MANAGER.placeholder)).toHaveValue('manager@ssb.no')
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

test('Navigates to next step', () => {
  const { getByText } = setup()

  userEvent.click(getByText(UI.NEXT))
})
