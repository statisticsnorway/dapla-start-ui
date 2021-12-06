import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { AppSettings } from '../components'
import { ApiContext, LanguageContext } from '../context/AppContext'
import { TEST_CONFIGURATIONS } from '../configurations'
import { SETTINGS, TEST_IDS } from '../enums'

const { alternativeApi, errorString, language } = TEST_CONFIGURATIONS
const apiContext = TEST_CONFIGURATIONS.apiContext(jest.fn())
const execute = jest.fn()

const setup = () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <ApiContext.Provider value={apiContext}>
      <LanguageContext.Provider value={{ language: language }}>
        <AppSettings open={true} setOpen={jest.fn()} />
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )

  return { getByPlaceholderText, getByTestId, getByText }
}

describe('Common mock', () => {
  beforeEach(() => {
    useAxios.mockReturnValue([{ error: undefined, loading: false }, execute])
  })

  test('Renders correctly', () => {
    const { getByPlaceholderText } = setup()

    expect(getByPlaceholderText(SETTINGS.API[language])).toHaveValue(apiContext.api)
  })

  test('Clicking button and pressing enter in input fires api call', () => {
    const { getByPlaceholderText, getByText } = setup()

    userEvent.type(getByPlaceholderText(SETTINGS.API[language]), '{enter}')

    userEvent.click(getByText(SETTINGS.APPLY[language]))

    expect(apiContext.setApi).toHaveBeenCalled()
  })

  test('Editing values works correctly', () => {
    const { getByPlaceholderText, getByText } = setup()

    userEvent.type(getByPlaceholderText(SETTINGS.API[language]), alternativeApi)

    expect(getByText(SETTINGS.EDITED_VALUES[language])).toBeInTheDocument()

    userEvent.click(getByText(SETTINGS.APPLY[language]))

    expect(apiContext.setApi).toHaveBeenCalled()
  })

  test('Resetting to default values works correctly', () => {
    const { getByPlaceholderText, getByTestId } = setup()

    userEvent.type(getByPlaceholderText(SETTINGS.API[language]), alternativeApi)

    userEvent.click(getByTestId(TEST_IDS.DEFAULT_SETTINGS_VALUES_BUTTON))

    expect(getByPlaceholderText(SETTINGS.API[language])).toHaveValue(apiContext.api)
  })
})

test('Shows error when there is a problem with the API', () => {
  useAxios.mockReturnValue([{ error: errorString, loading: false }, execute])

  const { getByText } = setup()

  expect(getByText(errorString)).toBeInTheDocument()
})
