import { useLocation } from 'react-router-dom'
import { Divider } from 'primereact/divider'

import { STEP_5 } from '../../content'

function Step5 () {
  let location = useLocation()

  return (
    <div className="grid mt-6">
      <div className="col-4" />
      <div className="col-4">
        <h1>{STEP_5.HEADER}</h1>
        <p>
          {STEP_5.SUBHEADER}
          <a href={`${STEP_5.JIRA_URL}${location.state.key}`}>{location.state.key}</a>
        </p>
        <Divider />
        {STEP_5.TEXT(`${STEP_5.JIRA_URL}${location.state.key}`)}
      </div>
      <div className="col-4" />
    </div>
  )
}

export default Step5
