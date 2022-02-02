import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import Step2Form from '../components/steps/Step2Form'
import { API } from '../configurations'
import { STEP_2, UI, WIZARD } from '../content'

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const testData = [
  { [API.MEMBER_OBJECT.NAME]: 'Manager', [API.MEMBER_OBJECT.EMAIL]: 'man@ssb.no' },
  { [API.MEMBER_OBJECT.NAME]: 'DPO', [API.MEMBER_OBJECT.EMAIL]: 'dpo@ssb.no' },
  { [API.MEMBER_OBJECT.NAME]: 'Developer', [API.MEMBER_OBJECT.EMAIL]: 'dev@ssb.no' },
  { [API.MEMBER_OBJECT.NAME]: 'Consumer', [API.MEMBER_OBJECT.EMAIL]: 'con@ssb.no' }
]

const setup = () => {
  const { getByText, getAllByRole, getAllByText, getByTestId } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/2']}>
        <Step2Form />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText, getAllByRole, getAllByText, getByTestId }
}

test('Required user input works correctly', async () => {
  useAxios.mockReturnValue([{ loading: false, error: undefined, data: testData }])

  const { getByText, getAllByRole } = setup()

  expect(getByText(UI.NEXT).closest('button')).toBeDisabled()

  userEvent.type(getAllByRole('searchbox')[0], 'man@ssb.no')

  await new Promise(r => setTimeout(r, 300))

  userEvent.keyboard('{ArrowDown}')
  userEvent.keyboard('{Enter}')

  expect(getAllByRole('searchbox')[0]).toHaveValue('Manager')

  expect(getByText(UI.NEXT).closest('button')).not.toBeDisabled()

  userEvent.click(getByText(UI.NEXT))
})

test('User multi-input (Chips) works correctly', async () => {
  useAxios.mockReturnValue([{ loading: false, error: undefined, data: testData }])

  const { getAllByText, getAllByRole } = setup()

  await asyncForEach(STEP_2.FORM_FIELDS, async (value, index) => {
    userEvent.type(getAllByRole('searchbox')[index + 1], `dpo@ssb.no`)

    await new Promise(r => setTimeout(r, 300))

    userEvent.keyboard('{ArrowDown}')
    userEvent.keyboard('{Enter}')

    await new Promise(r => setTimeout(r, 100))

    expect(getAllByText(`DPO`)).toHaveLength(index + 1)
  })
})

test('Regular user input works correctly', () => {
  useAxios.mockReturnValue([{ loading: false, error: undefined, data: testData }])

  const { getByTestId } = setup()

  userEvent.type(getByTestId(`${WIZARD.OTHER_INFO.ref}-testid`), 'Test')

  expect(getByTestId(`${WIZARD.OTHER_INFO.ref}-testid`)).toHaveValue('Test')
})
