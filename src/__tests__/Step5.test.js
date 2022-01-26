import { render } from '@testing-library/react'

import { Step5 } from '../components/steps'
import { STEP_5 } from '../content'

const setup = () => {
  const { getByText } = render(<Step5 />)

  return { getByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  expect(getByText(STEP_5.HEADER)).toBeInTheDocument()
})
