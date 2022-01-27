import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step5 } from '../components/steps'
import { STEP_5 } from '../content'

const setup = () => {
  const { getByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={[{ pathname: '/5', state: { key: 'DS-1' } }]}>
        <Step5 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  expect(getByText(STEP_5.HEADER)).toBeInTheDocument()
})
