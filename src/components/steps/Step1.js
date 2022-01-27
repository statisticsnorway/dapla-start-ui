import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { useWizardActions, useWizardContext } from '../../context/AppContext'
import { ShowHideFAQ } from '../index'
import { STEPS, UI, WIZARD } from '../../content'

function Step1 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  let navigate = useNavigate()

  return (
    <div className="grid">
      <div className="col-3" />
      <div className="col-6">
        <h1>{STEPS[1].pageTitle}</h1>
        <Divider />
        <>
          {WIZARD.TEAM_NAME.help}
          <div className="field mt-4">
            <label htmlFor={WIZARD.TEAM_NAME.ref} className="block">
              <b>{WIZARD.TEAM_NAME.title}</b>
              <span style={{ color: UI.REQUIRED }}>*</span>
            </label>
            <InputText
              className="block"
              style={{ width: '30%' }}
              id={WIZARD.TEAM_NAME.ref}
              value={wizard[WIZARD.TEAM_NAME.ref]}
              placeholder={WIZARD.TEAM_NAME.placeholder}
              aria-describedby={`${WIZARD.TEAM_NAME.title}-help`}
              onChange={e => setWizard({ type: WIZARD.TEAM_NAME.ref, payload: e.target.value })}
            />
            <small id={`${WIZARD.TEAM_NAME.title}-help`} className="block">{WIZARD.TEAM_NAME.description}</small>
          </div>
          <div className="flex justify-content-end mt-6">
            {wizard[WIZARD.TEAM_NAME.ref] !== '' && wizard[WIZARD.TEAM_NAME.ref] !== null ?
              <Button label={UI.NEXT} iconPos="right" icon="pi pi-arrow-right" onClick={() => navigate('/2')} />
              :
              <Button label={UI.NEXT} iconPos="right" icon="pi pi-arrow-right" disabled />
            }
          </div>
        </>
      </div>
      <ShowHideFAQ />
    </div>
  )
}

export default Step1
