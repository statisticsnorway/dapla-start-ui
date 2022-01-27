import useAxios from 'axios-hooks'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { Chip } from 'primereact/chip'

import { ApiContext, useWizardContext } from '../../context/AppContext'
import { API } from '../../configurations'
import { STEP_2, STEP_4, STEPS, UI, WIZARD } from '../../content'

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
        {STEP_4.TEXT}
        <h2>{wizard[WIZARD.TEAM_NAME.ref]}</h2>
        <ul className="list-none p-0 m-0">
          {wizard[WIZARD.MANAGER.ref] !== '' &&
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-3 font-medium">{WIZARD.MANAGER.title}</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{wizard[WIZARD.MANAGER.ref]}</div>
              </div>
            </li>
          }
          {STEP_2.FORM_FIELDS.map(element => wizard[WIZARD[element].ref] !== null &&
            <li
              key={WIZARD[element].ref}
              className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap"
            >
              <div className="text-500 w-6 md:w-3 font-medium">{WIZARD[element].title}</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                  {wizard[WIZARD[element].ref].join(', ')}
                </div>
              </div>
            </li>
          )}
          {wizard[WIZARD.SERVICES.ref] !== null &&
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-3 font-medium">{WIZARD.SERVICES.title}</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                  {wizard[WIZARD.SERVICES.ref].map(service =>
                    <Chip
                      key={service}
                      className="mr-2 custom-chip"
                      label={WIZARD.SERVICES.items.filter(item => item.value === service)[0].label}
                    />
                  )}
                </div>
              </div>
            </li>
          }
        </ul>
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
