import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { Step2 } from '../components/steps'
import { STEP_2, STEPS } from '../content'

jest.mock('../components/ShowHideFAQ', () => () => null)
jest.mock('../components/steps/Step2Form', () => () => null)

const setup = () => {
  const { getByText, getAllByText } = render(<Step2 />)

  return { getByText, getAllByText }
}

test('Renders correctly', () => {
  const { getByText } = setup()

  expect(getByText(STEPS[2].pageTitle)).toBeInTheDocument()
})

test('Renders data states help correctly', () => {
  const { getByText, getAllByText } = setup()

  userEvent.click(getByText(STEP_2.HELP_HEADER))

  STEP_2.GROUPS.forEach((group, index) => {
    if (index % 2 === 0) {
      expect(getByText(group.group)).toBeInTheDocument()
    } else {
      expect(getAllByText(group.group)).toHaveLength(2)
    }
  })
})
