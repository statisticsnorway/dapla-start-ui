import { Fieldset } from 'primereact/fieldset'

import FAQAccordion from './FAQAccordion'
import { UI } from '../enum'

function ShowHideFAQ () {
  return (
    <div className="col-3">
      <div className="sticky top-0 pt-3 pr-2">
        <Fieldset legend={UI.FAQ} toggleable collapsed style={{ fontSize: '0.85rem' }}>
          <FAQAccordion fontSize="0.85rem" />
        </Fieldset>
      </div>
    </div>
  )
}

export default ShowHideFAQ
