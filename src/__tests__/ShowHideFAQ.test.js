import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { ShowHideFAQ } from '../components'
import { FAQ, UI } from '../content'

const setup = () => {
  const { getByText } = render(<ShowHideFAQ />)

  return { getByText }
}

test('Renders correctly', async () => {
  const { getByText } = setup()

  await userEvent.click(getByText(UI.FAQ))

  FAQ.forEach(q => expect(getByText(q.header)).toBeInTheDocument())
})
