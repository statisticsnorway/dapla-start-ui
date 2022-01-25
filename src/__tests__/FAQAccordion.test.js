import { render } from '@testing-library/react'

import { FAQAccordion } from '../components'
import { FAQ } from '../enum'

const setup = () => {
  const { getByText } = render(<FAQAccordion />)

  return { getByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  FAQ.forEach(q => expect(getByText(q.header)).toBeInTheDocument())
})
