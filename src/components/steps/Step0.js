import { useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'

import { FAQAccordion } from '../index'
import { IMAGE_ALT_TEXT, STEP_0, STEPS, UI } from '../../enum'

function Step0 () {
  let navigate = useNavigate()

  return (
    <div className="grid">
      <div className="col-3" />
      <div className="col-6">
        <h1>{STEPS[0].pageTitle}</h1>
        <Divider />
        <div className="flex">
          <div className="flex-grow-1">
            {STEP_0.TEXT}
          </div>
          <div className="flex-shrink-0 align-self-center pl-2">
            <Image src="img/process-flowchart.png" alt={IMAGE_ALT_TEXT.DAPLA_START_FLOWCHART} width="250" preview />
          </div>
        </div>
        <div className="flex justify-content-end mt-4">
          <Button label={UI.START} icon="pi pi-arrow-right" iconPos="right" onClick={() => navigate('/1')} />
        </div>
        <Divider />
        <FAQAccordion fontSize="0.9rem" />
      </div>
      <div className="col-3" />
    </div>
  )
}

export default Step0
