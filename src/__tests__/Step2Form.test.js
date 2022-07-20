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

const refetch = jest.fn()
const testData = [
  {
    [API.MEMBER_OBJECT.NAME]: 'Manager',
    [API.MEMBER_OBJECT.EMAIL_SHORT]: 'man@ssb.no',
    [API.MEMBER_OBJECT.EMAIL]: 'Manager@ssb.no'
  },
  {
    [API.MEMBER_OBJECT.NAME]: 'Data Admin',
    [API.MEMBER_OBJECT.EMAIL_SHORT]: 'dad@ssb.no',
    [API.MEMBER_OBJECT.EMAIL]: 'Data.Admin@ssb.no'
  },
  {
    [API.MEMBER_OBJECT.NAME]: 'Developer',
    [API.MEMBER_OBJECT.EMAIL_SHORT]: 'dev@ssb.no',
    [API.MEMBER_OBJECT.EMAIL]: 'Developer@ssb.no'
  },
  {
    [API.MEMBER_OBJECT.NAME]: 'Consumer',
    [API.MEMBER_OBJECT.EMAIL_SHORT]: 'con@ssb.no',
    [API.MEMBER_OBJECT.EMAIL]: 'Consumer@ssb.no'
  }
]

const setup = () => {
  const { getByText, getAllByRole, getByTestId } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/2']}>
        <Step2Form />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText, getAllByRole, getByTestId }
}

test('Required user input works correctly', async () => {
  useAxios.mockReturnValue([{ loading: false, error: null, data: testData }, refetch])

  const { getByText, getAllByRole } = setup()

  expect(getByText(UI.NEXT).closest('button')).toBeDisabled()

  await userEvent.type(getAllByRole('combobox')[0], testData[0][API.MEMBER_OBJECT.EMAIL_SHORT])

  await new Promise(r => setTimeout(r, 300))

  await userEvent.keyboard('{ArrowDown}')
  await userEvent.keyboard('{Enter}')
  await userEvent.click(getByText(testData[0][API.MEMBER_OBJECT.NAME]))
  await userEvent.keyboard('{Escape}')

  await new Promise(r => setTimeout(r, 200))

  expect(getByText('Manager')).toBeInTheDocument()

  expect(getByText(UI.NEXT).closest('button')).not.toBeDisabled()

  await userEvent.click(getByText(UI.NEXT))
})

test('User multi-input (Chips) works correctly', async () => {
  useAxios.mockReturnValue([{ loading: false, error: null, data: testData }, refetch])

  const { getByText, getAllByRole } = setup()

  await asyncForEach(STEP_2.FORM_FIELDS, async (value, index) => {
    await userEvent.type(getAllByRole('combobox')[index + 1], testData[index + 1][API.MEMBER_OBJECT.EMAIL_SHORT])

    await new Promise(r => setTimeout(r, 300))

    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')
    await userEvent.click(getByText(testData[index + 1][API.MEMBER_OBJECT.NAME]))
    await userEvent.keyboard('{Escape}')

    await new Promise(r => setTimeout(r, 200))

    expect(getByText(testData[index + 1][API.MEMBER_OBJECT.NAME])).toBeInTheDocument()
  })
})

test('Regular user input works correctly', async () => {
  useAxios.mockReturnValue([{ loading: false, error: null, data: testData }, refetch])

  const { getByTestId } = setup()

  await userEvent.type(getByTestId(`${WIZARD.OTHER_INFO.ref}-testid`), 'Test')

  expect(getByTestId(`${WIZARD.OTHER_INFO.ref}-testid`)).toHaveValue('Test')
})

test('Error handling works correctly', () => {
  class ErrorClass {
    object = { name: 'Error', message: 'Network error' }

    toJSON () {
      return this.object
    }
  }

  const errorMessage = new ErrorClass()

  useAxios.mockReturnValue([{ loading: false, error: errorMessage, data: null }, refetch])

  const { getByText } = setup()

  expect(getByText('Error: Network error')).toBeInTheDocument()
})

test('Error response handling works correctly', () => {
  const errorMessage = { response: { data: { detail: 'Something went wrong!' } } }

  useAxios.mockReturnValue([{ loading: false, error: errorMessage, data: null }, refetch])

  const { getByText } = setup()

  expect(getByText('Something went wrong!')).toBeInTheDocument()
})

test('Try again after error works correctly', async () => {
  const errorMessage = { response: { data: { detail: 'Something went wrong!' } } }

  useAxios.mockReturnValueOnce([{ loading: false, error: errorMessage, data: null }, refetch])
    .mockReturnValueOnce([{ loading: false, error: null, data: testData }, refetch])

  const { getByText } = setup()

  expect(getByText('Something went wrong!')).toBeInTheDocument()

  await userEvent.click(getByText(UI.TRY_AGAIN))

  expect(refetch).toHaveBeenCalled()
})
