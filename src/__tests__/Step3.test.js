import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step3 } from '../components/steps'
import { UI, WIZARD } from '../enum'

jest.mock('../components/ShowHideFAQ', () => () => null)

const setup = () => {
  const { container, getByTestId, getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/3']}>
        <Step3 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { container, getByTestId, getByText }
}

test('User select works correctly', () => {
  const { container, getByText } = setup()

  WIZARD.SERVICES.items.forEach(item => {
    userEvent.click(container.querySelector('.p-multiselect'))
    userEvent.click(getByText(`${item.label} -`))
    userEvent.click(container.querySelector('.p-multiselect'))

    expect(getByText(item.label)).toBeInTheDocument()
  })
})

test('Navigates to next step', () => {
  const { getByText } = setup()

  userEvent.click(getByText(UI.NEXT))
})
