import { Accordion, AccordionTab } from 'primereact/accordion'

import { FAQ } from '../enum'

function FAQAccordion ({ fontSize = '1rem' }) {
  return (
    <Accordion multiple style={{ fontSize: fontSize }}>
      {FAQ.map(q =>
        <AccordionTab key={q.header} header={q.header}>
          {q.text}
        </AccordionTab>
      )}
    </Accordion>
  )
}

export default FAQAccordion
