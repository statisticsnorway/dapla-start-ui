import useAxios from 'axios-hooks'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputTextarea } from 'primereact/inputtextarea'
import { AutoComplete } from 'primereact/autocomplete'
import { Messages } from 'primereact/messages'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { ApiContext, useWizardActions, useWizardContext } from '../../context/AppContext'
import { API, ERROR_MESSAGE } from '../../configurations'
import { STEP_2, UI, WIZARD } from '../../content'

const OPTIONS_GROUPS = [
  WIZARD.MANAGER.ref,
  WIZARD.DATA_ADMINS.ref,
  WIZARD.DEVELOPERS.ref,
  WIZARD.CONSUMERS.ref
]

function Step2Form () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()
  const { api } = useContext(ApiContext)

  const displayMessages = useRef(null)

  let navigate = useNavigate()

  const [filteredNames, setFilteredNames] = useState(OPTIONS_GROUPS.reduce((acc, group) => {
    return { ...acc, [group]: [] }
  }, {}))

  const [{ loading, error, data }, refetch] = useAxios(`${api}${API.GET_USERS}`)

  useEffect(() => {
    if (!loading && !error) {
      setFilteredNames(OPTIONS_GROUPS.reduce((acc, group) => {
        return { ...acc, [group]: data }
      }, {}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!error && displayMessages.current) {
      displayMessages.current.clear()
    }

    if (error) {
      if (error.response) {
        displayMessages.current.show([ERROR_MESSAGE(error, refetch, error.response.data.detail)]) //TODO: This fails is backend is offline
      } else {
        displayMessages.current.show([ERROR_MESSAGE(error, refetch)])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const nameTemplate = item => <>
    {`${item[API.MEMBER_OBJECT.NAME]} `}
    <span style={{ opacity: 0.6 }}>{`(${item[API.MEMBER_OBJECT.EMAIL_SHORT]})`}</span>
  </>

  const searchNames = (event, field) => {
    let _filteredNames

    if (!event.query.trim().length) {
      _filteredNames = data
    } else {
      _filteredNames = data.filter(option => {
        const query = event.query.toLowerCase()

        return (
          option[API.MEMBER_OBJECT.NAME].toLowerCase().includes(query)
          ||
          option[API.MEMBER_OBJECT.EMAIL_SHORT].toLowerCase().includes(query)
        )
      })
    }

    setFilteredNames({ ...filteredNames, [field]: _filteredNames })
  }

  return (
    <>
      {error && <Messages ref={displayMessages} />}
      {STEP_2.HELP}
      <div className="field">
        <label htmlFor={WIZARD.MANAGER.ref} className="block">
          <b>{WIZARD.MANAGER.title}</b>
          <span style={{ color: UI.REQUIRED }}>*</span>
        </label>
        <AutoComplete
          multiple
          field="name"
          id={WIZARD.MANAGER.ref}
          itemTemplate={nameTemplate}
          disabled={loading || error}
          suggestions={filteredNames[WIZARD.MANAGER.ref]}
          completeMethod={e => searchNames(e, WIZARD.MANAGER.ref)}
          value={wizard[WIZARD.MANAGER.ref] !== null ? [wizard[WIZARD.MANAGER.ref]] : null}
          onChange={e => setWizard({
            type: WIZARD.MANAGER.ref,
            payload: e.value !== null ?
              e.value.length !== 0 ?
                e.value.length > 1 ?
                  e.value[e.value.length - 1]
                  : e.value[0]
                : null
              : null
          })}
        />
        <small id={`${WIZARD.MANAGER.ref}-help`} className="block">{WIZARD.MANAGER.description}</small>
      </div>
      {STEP_2.FORM_FIELDS.map(input =>
        <div key={input} className="field mt-4">
          <label htmlFor={WIZARD[input].ref} className="block"><b>{WIZARD[input].title}</b></label>
          <AutoComplete
            multiple
            field="name"
            id={WIZARD[input].ref}
            itemTemplate={nameTemplate}
            disabled={loading || error}
            value={wizard[WIZARD[input].ref]}
            suggestions={filteredNames[WIZARD[input].ref]}
            completeMethod={e => searchNames(e, WIZARD[input].ref)}
            onChange={e => setWizard({ type: WIZARD[input].ref, payload: e.value })}
          />
          <small id={`${WIZARD[input].ref}-help`} className="block">{WIZARD[input].description}</small>
        </div>
      )}
      <Divider />
      <div className="field">
        <label htmlFor={WIZARD.OTHER_INFO.ref} className="block"><b>{WIZARD.OTHER_INFO.title}</b></label>
        <InputTextarea
          rows={3}
          cols={40}
          autoResize
          value={wizard[WIZARD.OTHER_INFO.ref]}
          data-testid={`${WIZARD.OTHER_INFO.ref}-testid`}
          onChange={e => setWizard({ type: WIZARD.OTHER_INFO.ref, payload: e.target.value })}
        />
        <small id={`${WIZARD.OTHER_INFO.ref}-help`} className="block">{WIZARD.OTHER_INFO.description}</small>
      </div>
      <div className="flex justify-content-end mt-4">
        {wizard[WIZARD.MANAGER.ref] !== null ?
          <Button label={UI.NEXT} iconPos="right" icon="pi pi-arrow-right" onClick={() => navigate('/3')} />
          :
          <Button label={UI.NEXT} iconPos="right" icon="pi pi-arrow-right" disabled />
        }
      </div>
    </>
  )
}

export default Step2Form
