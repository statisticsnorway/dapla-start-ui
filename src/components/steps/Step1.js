import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { useWizardActions, useWizardContext } from '../../context/AppContext'
import { ShowHideFAQ } from '../index'
import { STEPS, UI, WIZARD } from '../../enum'

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
            <label htmlFor={WIZARD.TEAM_NAME.ref} className="block"><b>{WIZARD.TEAM_NAME.title}</b></label>
            <InputText
              className="block"
              id={WIZARD.TEAM_NAME.ref}
              value={wizard[WIZARD.TEAM_NAME.ref]}
              placeholder={WIZARD.TEAM_NAME.placeholder}
              aria-describedby={`${WIZARD.TEAM_NAME.title}-help`}
              onChange={e => setWizard({ type: WIZARD.TEAM_NAME.ref, payload: e.target.value })}
            />
            <small id={`${WIZARD.TEAM_NAME.title}-help`} className="block">{WIZARD.TEAM_NAME.description}</small>
          </div>
          <div className="flex justify-content-end mt-6">
            <Button label={UI.NEXT} icon="pi pi-arrow-right" iconPos="right" onClick={() => navigate('/2')} />
          </div>
        </>
      </div>
      <ShowHideFAQ />
    </div>
  )
}

export default Step1
