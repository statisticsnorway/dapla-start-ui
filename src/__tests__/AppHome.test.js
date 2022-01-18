import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppHome } from '../components'
import { ApiContext, LanguageContext } from '../context/AppContext'
import { TEST_CONFIGURATIONS } from '../configurations'
import { STEPS } from '../enums'

jest.mock('../components/steps/Step1', () => () => null)
jest.mock('../components/steps/Step2', () => () => null)
jest.mock('../components/steps/Step3', () => () => null)
jest.mock('../components/steps/Step4', () => () => null)

const { language } = TEST_CONFIGURATIONS
const apiContext = TEST_CONFIGURATIONS.apiContext(jest.fn())

const setup = () => {
  const { getByText } = render(
    <ApiContext.Provider value={apiContext}>
      <LanguageContext.Provider value={{ language: language }}>
        <MemoryRouter initialEntries={['/']}>
          <AppHome />
        </MemoryRouter>
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  Object.entries(STEPS).slice(0, -1).map(([key, step]) => {
    expect(getByText(step.header)).toBeInTheDocument()
  })
})
