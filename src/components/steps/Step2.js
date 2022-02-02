import { Accordion, AccordionTab } from 'primereact/accordion'
import { DataTable } from 'primereact/datatable'
import { Divider } from 'primereact/divider'
import { Column } from 'primereact/column'

import Step2Form from './Step2Form'
import { ShowHideFAQ } from '../'
import { STEP_2, STEPS } from '../../content'

function Step2 () {
  const groupBodyTemplate = (rowData, { field }) => <b>{rowData[field]}</b>

  const accessBodyTemplate = (rowData, { field }) => {
    if (rowData[field]) {
      return <i className="pi pi-check" style={{ color: '#22C55E', fontWeight: 'bold' }} />
    } else {
      return null
    }
  }

  return (
    <div className="grid">
      <div className="col-3" />
      <div className="col-6">
        <h1>{STEPS[2].pageTitle}</h1>
        <Divider />
        <Accordion style={{ fontSize: '0.85rem' }}>
          <AccordionTab header={STEP_2.HELP_HEADER}>
            {STEP_2.TEXT}
            <DataTable
              showGridlines
              value={STEP_2.GROUPS}
              style={{ fontSize: '0.8rem', marginTop: '1.5rem' }}
            >
              <Column field="group" body={groupBodyTemplate} />
              {Object.keys(STEP_2.ACCESS_LEVELS).map(key =>
                <Column
                  key={key}
                  field={key}
                  align="center"
                  alignHeader="left"
                  body={accessBodyTemplate}
                  header={STEP_2.ACCESS_LEVELS[key]}
                />
              )}
            </DataTable>
          </AccordionTab>
        </Accordion>
        <Divider />
        <Step2Form />
      </div>
      <ShowHideFAQ />
    </div>
  )
}

export default Step2
