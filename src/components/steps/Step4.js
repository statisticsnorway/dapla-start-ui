import { useNavigate } from 'react-router-dom'
import { MultiSelect } from 'primereact/multiselect'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { useWizardActions, useWizardContext } from '../../context/AppContext'
import { ShowHideFAQ } from '../index'
import { STEPS, UI, WIZARD } from '../../content'

function Step4 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  let navigate = useNavigate()

  const serviceTemplate = option =>
    <>
      <b>{option.label} - </b>
      <span>{option.description}</span>
    </>

  return (
    <div className="grid">
      <div className="col-3" />
      <div className="col-6">
        <h1>{STEPS[4].pageTitle}</h1>
        <Divider />
        {WIZARD.SERVICES.description}
        <MultiSelect
          display="chip"
          optionLabel="label"
          showSelectAll={false}
          itemTemplate={serviceTemplate}
          options={WIZARD.SERVICES.items}
          value={wizard[WIZARD.SERVICES.ref]}
          onChange={e => setWizard({ type: WIZARD.SERVICES.ref, payload: e.value })}
        />
        <div className="flex justify-content-end mt-4">
          <Button label={UI.NEXT} icon="pi pi-arrow-right" iconPos="right" onClick={() => navigate('/5')} />
        </div>
      </div>
      <ShowHideFAQ />
    </div>
  )
}

export default Step4
