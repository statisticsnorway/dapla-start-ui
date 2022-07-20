import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'

import { useWizardContext, useWizardOverrideActions, useWizardOverrideContext } from '../../context/AppContext'
import { createUniformWord } from '../../configurations'
import { UI, WIZARD } from '../../content'

function Step1Override () {
  const { wizard } = useWizardContext()
  const { wizardOverride } = useWizardOverrideContext()
  const { setWizardOverride } = useWizardOverrideActions()

  return (
    <>
      {wizardOverride[WIZARD.UNIFORM_TEAM_NAME.ref].length > 0 &&
        <>
          <span
            style={{
              opacity: 0.7,
              fontSize: '0.7rem',
              color: wizardOverride[WIZARD.UNIFORM_TEAM_NAME.ref].length >= WIZARD.UNIFORM_TEAM_NAME.max_chars ?
                UI.WARNING : '#495057'
            }}
          >
            {` (${wizardOverride[WIZARD.UNIFORM_TEAM_NAME.ref].length} / ${WIZARD.UNIFORM_TEAM_NAME.max_chars} ${UI.CHARS})`}
        </span>
          <div className="field-checkbox mt-3" style={{ fontSize: '0.9rem' }}>
            <Checkbox
              inputId={WIZARD.UNIFORM_TEAM_NAME.ref}
              checked={wizardOverride[WIZARD.UNIFORM_TEAM_NAME.override]}
              onChange={e => {
                setWizardOverride({ type: WIZARD.UNIFORM_TEAM_NAME.override, payload: e.checked })

                if (!e.checked) {
                  setWizardOverride({
                    type: WIZARD.UNIFORM_TEAM_NAME.ref,
                    payload: createUniformWord(wizard[WIZARD.TEAM_NAME.ref])
                  })
                }
              }} />
            <label htmlFor={WIZARD.UNIFORM_TEAM_NAME.ref} style={{ marginTop: '0.15rem' }}>{UI.OVERRIDE}</label>
          </div>
          {wizardOverride[WIZARD.UNIFORM_TEAM_NAME.override] &&
            <div className="field">
              <InputText
                className="block"
                keyfilter={/^[a-z-]*$/}
                style={{ minWidth: '300px' }}
                id={WIZARD.UNIFORM_TEAM_NAME.ref}
                value={wizardOverride[WIZARD.UNIFORM_TEAM_NAME.ref]}
                onChange={e => {
                  if (createUniformWord(e.target.value).length <= WIZARD.UNIFORM_TEAM_NAME.max_chars) {
                    setWizardOverride({ type: WIZARD.UNIFORM_TEAM_NAME.ref, payload: e.target.value })
                  }
                }}
              />
              <small id={`${WIZARD.UNIFORM_TEAM_NAME.ref}-help`} className="block">
                {WIZARD.UNIFORM_TEAM_NAME.description}
              </small>
            </div>
          }
        </>
      }
    </>
  )
}

export default Step1Override
