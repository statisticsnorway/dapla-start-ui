import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Chips } from 'primereact/chips'

import { useWizardActions, useWizardContext } from '../../context/AppContext'
import { STEP_2, UI, WIZARD } from '../../content'

function Step2Form () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  let navigate = useNavigate()

  return (
    <>
      {STEP_2.HELP}
      <div className="field">
        <label htmlFor={WIZARD.MANAGER.ref} className="block">
          <b>{WIZARD.MANAGER.title}</b>
          <span style={{ color: UI.REQUIRED }}>*</span>
        </label>
        <InputText
          className="block"
          id={WIZARD.MANAGER.ref}
          style={{ width: '25%' }}
          value={wizard[WIZARD.MANAGER.ref]}
          placeholder={WIZARD.MANAGER.placeholder}
          aria-describedby={`${WIZARD.MANAGER.title}-help`}
          onChange={e => setWizard({ type: WIZARD.MANAGER.ref, payload: e.target.value })}
        />
        <small id={`${WIZARD.MANAGER.title}-help`} className="block">{WIZARD.MANAGER.description}</small>
      </div>
      {STEP_2.FORM_FIELDS.map(input =>
        <div key={input} className="field mt-4">
          <label htmlFor={WIZARD[input].ref} className="block"><b>{WIZARD[input].title}</b></label>
          <Chips
            separator=","
            value={wizard[WIZARD[input].ref]}
            placeholder={WIZARD[input].placeholder}
            onChange={e => setWizard({ type: WIZARD[input].ref, payload: e.value })}
          />
          <small id={`${WIZARD[input].title}-help`} className="block">{WIZARD[input].description}</small>
        </div>
      )}
      <div className="flex justify-content-end mt-6">
        {wizard[WIZARD.MANAGER.ref] !== '' && wizard[WIZARD.MANAGER.ref] !== null ?
          <Button label={UI.NEXT} iconPos="right" icon="pi pi-arrow-right" onClick={() => navigate('/3')} />
          :
          <Button label={UI.NEXT} iconPos="right" icon="pi pi-arrow-right" disabled />
        }
      </div>
    </>
  )
}

export default Step2Form
