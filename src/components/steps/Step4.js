import { useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { useWizardContext } from '../../context/AppContext'
import { STEPS, UI } from '../../enum'

function Step4 () {
  const { wizard } = useWizardContext()

  let navigate = useNavigate()

  return (
    <div className="grid">
      <div className="col-3" />
      <div className="col-6">
        <h1>{STEPS[4].pageTitle}</h1>
        <Divider />
        <pre>
          {JSON.stringify(wizard, null, 2)}
        </pre>
        <div className="flex justify-content-end mt-6">
          <Button label={UI.COMPLETE} icon="pi pi-thumbs-up" iconPos="right" onClick={() => navigate('/5')} />
        </div>
      </div>
      <div className="col-3" />
    </div>
  )
}

export default Step4
