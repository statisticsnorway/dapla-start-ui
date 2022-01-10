import { createContext, useContext, useReducer, useState } from 'react'
import { LANGUAGE } from '@statisticsnorway/dapla-js-utilities'

const initWizard = initial => initial

const initialWizard = {
  teamName: '',
  manager: '',
  dataProtectionOfficers: [],
  developers: [],
  consumers: []
}

const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'setTeamName':
      return { ...state, teamName: action.payload }

    case 'setManager':
      return { ...state, manager: action.payload }

    case 'setDataProtectionOfficers':
      return { ...state, dataProtectionOfficers: action.payload }

    case 'setDevelopers':
      return { ...state, developers: action.payload }

    case 'setConsumers':
      return { ...state, consumers: action.payload }

    default:
      return state
  }
}

const WizardContext = createContext(null)
const WizardContextActions = createContext(null)

export const useWizardContext = () => useContext(WizardContext)
export const useWizardActions = () => useContext(WizardContextActions)

export const ApiContext = createContext({
  api: window.__ENV.REACT_APP_API
})

export const LanguageContext = createContext(LANGUAGE.LANGUAGES.NORWEGIAN.languageCode)

export const AppContextProvider = props => {
  const [api, setApi] = useState(window.__ENV.REACT_APP_API)
  const [language, setLanguage] = useState(LANGUAGE.LANGUAGES.NORWEGIAN.languageCode)
  const [wizard, setWizard] = useReducer(wizardReducer, initialWizard, initWizard)

  return (
    <ApiContext.Provider value={{ api, setApi }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <WizardContext.Provider value={{ wizard }}>
          <WizardContextActions.Provider value={{ setWizard }}>
            {props.children}
          </WizardContextActions.Provider>
        </WizardContext.Provider>
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )
}
