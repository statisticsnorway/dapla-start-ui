import useAxios from 'axios-hooks'
import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Messages } from 'primereact/messages'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { Chip } from 'primereact/chip'

import { ApiContext, useWizardContext } from '../../context/AppContext'
import { API, ERROR_MESSAGE, HELP_MESSAGE } from '../../configurations'
import { STEP_2, STEP_4, STEPS, UI, WIZARD } from '../../content'

const resolveMembers = member => <>
  {`${member[API.MEMBER_OBJECT.NAME]} `}
  <span style={{ opacity: 0.6 }}>{`(${member[API.MEMBER_OBJECT.EMAIL_SHORT]})`}</span>
</>

function Step4 () {
  const { wizard } = useWizardContext()
  const { api } = useContext(ApiContext)

  const displayMessages = useRef(null)

  let navigate = useNavigate()

  const [{ loading, error }, execute] = useAxios({ method: 'POST' }, { manual: true, useCache: false })

  const doExecute = () => {
    execute({
      data: wizard,
      url: `${api}${API.CREATE_JIRA}`
    }).then(response => {
      navigate('/5', { state: response.data })
    })
  }

  useEffect(() => {
    if (!error && displayMessages.current) {
      displayMessages.current.clear()
    }

    if (error) {
      if (error.response) {
        displayMessages.current.show([
          ERROR_MESSAGE(error, doExecute, error.response.data.detail), //TODO: This fails is backend is offline
          HELP_MESSAGE(wizard)
        ])
      } else {
        displayMessages.current.show([
          ERROR_MESSAGE(error, doExecute),
          HELP_MESSAGE(wizard)
        ])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const readyToGo = () => wizard[WIZARD.TEAM_NAME.ref].length > 2 && wizard[WIZARD.MANAGER.ref] !== null

  return (
    <div className="grid">
      <div className="col-3" />
      <div className="col-6">
        <h1>{STEPS[4].pageTitle}</h1>
        <Divider />
        {STEP_4.TEXT}
        {error && <Messages ref={displayMessages} />}
        {wizard[WIZARD.TEAM_NAME.ref].length > 6 && <h2>{wizard[WIZARD.TEAM_NAME.ref]}</h2>}
        <ul className="list-none p-0 m-0">
          {wizard[WIZARD.MANAGER.ref] !== null &&
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-3 font-medium">{WIZARD.MANAGER.title}</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                  {resolveMembers(wizard[WIZARD.MANAGER.ref])}
                </div>
              </div>
            </li>
          }
          {STEP_2.FORM_FIELDS.map(element => {
            if (wizard[WIZARD[element].ref] !== null) {
              return (
                <li
                  key={WIZARD[element].ref}
                  className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap"
                >
                  <div className="text-500 w-6 md:w-3 font-medium">{WIZARD[element].title}</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      <ul className="list-none p-0 m-0">
                        {wizard[WIZARD[element].ref].map(innerElement =>
                          <li key={innerElement[API.MEMBER_OBJECT.EMAIL_SHORT]}>{resolveMembers(innerElement)}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            } else {
              return null
            }
          })}
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
          {wizard[WIZARD.OTHER_INFO.ref] !== '' &&
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-3 font-medium">{WIZARD.OTHER_INFO.title}</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {wizard[WIZARD.OTHER_INFO.ref]}
                  </p>
                </div>
              </div>
            </li>
          }
        </ul>
        <div className="flex justify-content-end mt-4">
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
