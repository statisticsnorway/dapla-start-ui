import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step6 } from '../components/steps'
import { STEP_6 } from '../content'

const setup = () => {
  const { getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={[{ pathname: '/6', state: { key: 'DS-1' } }]}>
        <Step6 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  expect(getByText(STEP_6.HEADER)).toBeInTheDocument()
})
