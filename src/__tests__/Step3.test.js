import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext'
import { Step3 } from '../components/steps'
import { API } from '../configurations'
import { UI } from '../content'

const refetch = jest.fn()
const testData = [
  {
    [API.ORG_INFO_OBJECT.CODE]: '10',
    [API.ORG_INFO_OBJECT.NAME]: 'Seksjon 10',
    [API.ORG_INFO_OBJECT.PARENT_CODE]: '1'
  },
  {
    [API.ORG_INFO_OBJECT.CODE]: '11',
    [API.ORG_INFO_OBJECT.NAME]: 'Seksjon 11',
    [API.ORG_INFO_OBJECT.PARENT_CODE]: '1'
  }
]

const setup = () => {
  const { getByText, getAllByRole } = render(
    <AppContextProvider>
      <MemoryRouter initialEntries={['/3']}>
        <Step3 />
      </MemoryRouter>
    </AppContextProvider>
  )

  return { getByText, getAllByRole }
}

test('User input works correctly', async () => {
  useAxios.mockReturnValue([{ loading: false, error: null, data: testData }, refetch])

  const { getByText, getAllByRole } = setup()

  await userEvent.type(getAllByRole('combobox')[0], testData[0][API.ORG_INFO_OBJECT.CODE])

  await new Promise(r => setTimeout(r, 300))

  await userEvent.keyboard('{ArrowDown}')
  await userEvent.keyboard('{Enter}')
  await userEvent.click(getByText(testData[0][API.ORG_INFO_OBJECT.NAME]))
  await userEvent.keyboard('{Escape}')

  await new Promise(r => setTimeout(r, 200))

  expect(getByText('Seksjon 10')).toBeInTheDocument()

  await userEvent.click(getByText(UI.NEXT))
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
