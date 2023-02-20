import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step4 } from '../components/steps'
import { UI, WIZARD } from '../content'

jest.mock('../components/ShowHideFAQ', () => () => null)

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const setup = () => {
  const { container, getByText, getAllByText } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/4']}>
        <Step4 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { container, getByText, getAllByText }
}

test('User select works correctly', async () => {
  const { container, getAllByText } = setup()

  await asyncForEach(WIZARD.SERVICES.items, async (value) => {
    await userEvent.click(container.querySelector('.p-multiselect-trigger'))
    expect(getAllByText(value.label)).toHaveLength(1)
  })
})

test('Navigates to next step', async () => {
  const { getByText } = setup()

  await userEvent.click(getByText(UI.NEXT))
})
