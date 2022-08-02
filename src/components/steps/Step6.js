import { useLocation } from 'react-router-dom'
import { Divider } from 'primereact/divider'

import { STEP_6 } from '../../content'

function Step6 () {
  let location = useLocation()

  return (
    <div className="grid mt-6">
      <div className="col-4" />
      <div className="col-4">
        <h1>{STEP_6.HEADER}</h1>
        <p>
          {STEP_6.SUBHEADER}
          <a href={`${STEP_6.JIRA_URL}${location.state.key}`}>{location.state.key}</a>
        </p>
        <Divider />
        {STEP_6.TEXT(`${STEP_6.JIRA_URL}${location.state.key}`)}
      </div>
      <div className="col-4" />
    </div>
  )
}

export default Step6
