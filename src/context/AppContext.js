import { createContext, useContext, useReducer, useState } from 'react'

import { WIZARD } from '../content'

const initWizard = initial => initial
const initWizardOverride = initialOverride => initialOverride

const initialWizard = {
  [WIZARD.TEAM_NAME.ref]: '',
  [WIZARD.MANAGER.ref]: null,
  [WIZARD.DATA_ADMINS.ref]: null,
  [WIZARD.DEVELOPERS.ref]: null,
  [WIZARD.CONSUMERS.ref]: null,
  [WIZARD.SUPPORT.ref]: null,
  [WIZARD.OTHER_INFO.ref]: '',
  [WIZARD.ORG_INFO.ref]: null,
  [WIZARD.SERVICES.ref]: null,
  ui_version: process.env.REACT_APP_VERSION
}

const initialWizardOverride = {
  [WIZARD.UNIFORM_TEAM_NAME.override]: false,
  [WIZARD.UNIFORM_TEAM_NAME.ref]: ''
}

const wizardReducer = (state, action) => {
  switch (action.type) {
    case WIZARD.TEAM_NAME.ref:
      return { ...state, [WIZARD.TEAM_NAME.ref]: action.payload }

    case WIZARD.MANAGER.ref:
      return { ...state, [WIZARD.MANAGER.ref]: action.payload }

    case WIZARD.DATA_ADMINS.ref:
      return { ...state, [WIZARD.DATA_ADMINS.ref]: action.payload }

    case WIZARD.DEVELOPERS.ref:
      return { ...state, [WIZARD.DEVELOPERS.ref]: action.payload }

    case WIZARD.CONSUMERS.ref:
      return { ...state, [WIZARD.CONSUMERS.ref]: action.payload }

    case WIZARD.OTHER_INFO.ref:
      return { ...state, [WIZARD.OTHER_INFO.ref]: action.payload }

    case WIZARD.ORG_INFO.ref:
      return { ...state, [WIZARD.ORG_INFO.ref]: action.payload }

    case WIZARD.SERVICES.ref:
      return { ...state, [WIZARD.SERVICES.ref]: action.payload }

    default:
      return state
  }
}

const wizardOverrideReducer = (state, action) => {
  switch (action.type) {
    case WIZARD.UNIFORM_TEAM_NAME.ref:
      return { ...state, [WIZARD.UNIFORM_TEAM_NAME.ref]: action.payload }

    case WIZARD.UNIFORM_TEAM_NAME.override:
      return { ...state, [WIZARD.UNIFORM_TEAM_NAME.override]: action.payload }

    default:
      return state
  }
}

const WizardContext = createContext(null)
const WizardContextActions = createContext(null)
const WizardOverrideContext = createContext(null)
const WizardOverrideContextActions = createContext(null)

export const useWizardContext = () => useContext(WizardContext)
export const useWizardActions = () => useContext(WizardContextActions)
export const useWizardOverrideContext = () => useContext(WizardOverrideContext)
export const useWizardOverrideActions = () => useContext(WizardOverrideContextActions)

export const ApiContext = createContext({ api: window.__ENV.REACT_APP_API })

export const AppContextProvider = props => {
  const [api, setApi] = useState(window.__ENV.REACT_APP_API)
  const [wizard, setWizard] = useReducer(wizardReducer, initialWizard, initWizard)
  const [wizardOverride, setWizardOverride] = useReducer(wizardOverrideReducer, initialWizardOverride, initWizardOverride)

  return (
    <ApiContext.Provider value={{ api, setApi }}>
      <WizardOverrideContext.Provider value={{ wizardOverride }}>
        <WizardOverrideContextActions.Provider value={{ setWizardOverride }}>
          <WizardContext.Provider value={{ wizard }}>
            <WizardContextActions.Provider value={{ setWizard }}>
              {props.children}
            </WizardContextActions.Provider>
          </WizardContext.Provider>
        </WizardOverrideContextActions.Provider>
      </WizardOverrideContext.Provider>
    </ApiContext.Provider>
  )
}
