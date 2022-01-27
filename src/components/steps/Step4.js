import useAxios from 'axios-hooks'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { ApiContext, useWizardContext } from '../../context/AppContext'
import { API } from '../../configurations'
import { STEPS, UI, WIZARD } from '../../content'

function Step4 () {
  const { wizard } = useWizardContext()
  const { api } = useContext(ApiContext)

  let navigate = useNavigate()

  const [{ loading, error }, execute] = useAxios({ method: 'POST' }, { manual: true, useCache: false })

  const doExecute = () => {
    execute({
      data: wizard,
      url: `${api}${API.CREATE_JIRA}`
    }).then(response => {
      navigate('/5', { state: response.data })
    }).catch(err => {
      console.log(err)
      console.log(error)
    })
  }

  const readyToGo = () =>
    wizard[WIZARD.TEAM_NAME.ref] !== '' && wizard[WIZARD.TEAM_NAME.ref] !== null &&
    wizard[WIZARD.MANAGER.ref] !== '' && wizard[WIZARD.MANAGER.ref] !== null

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
          {readyToGo() ?
            loading ?
              <Button disabled loading label={UI.COMPLETE} icon="pi pi-thumbs-up" iconPos="right" />
              :
              <Button label={UI.COMPLETE} icon="pi pi-thumbs-up" iconPos="right" onClick={() => doExecute()} />
            :
            <Button disabled label={UI.COMPLETE} icon="pi pi-thumbs-up" iconPos="right" />
          }
        </div>
      </div>
      <div className="col-3" />
    </div>
  )
}

export default Step4
