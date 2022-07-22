import useAxios from 'axios-hooks'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AutoComplete } from 'primereact/autocomplete'
import { Messages } from 'primereact/messages'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

import { ShowHideFAQ } from '../index'
import { ApiContext, useWizardActions, useWizardContext } from '../../context/AppContext'
import { API, ERROR_MESSAGE } from '../../configurations'
import { STEPS, UI, WIZARD } from '../../content'

function Step3 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()
  const { api } = useContext(ApiContext)

  const displayMessages = useRef(null)

  let navigate = useNavigate()

  const [filteredOrgInfo, setFilteredOrgInfo] = useState([])

  const [{ loading, error, data }, refetch] = useAxios(`${api}${API.GET_ORG_INFO}`)

  useEffect(() => {
    if (!loading && !error) {
      setFilteredOrgInfo(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!error && displayMessages.current) {
      displayMessages.current.clear()
    }

    if (error) {
      if (error.response && error.response.data) {
        displayMessages.current.show([ERROR_MESSAGE(error, refetch, error.response.data.detail)])
      } else {
        displayMessages.current.show([ERROR_MESSAGE(error, refetch)])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const orgInfoTemplate = item => <>
    {`${item[API.ORG_INFO_OBJECT.NAME]} `}
    <span style={{ opacity: 0.6 }}>{`(${item[API.ORG_INFO_OBJECT.CODE]})`}</span>
  </>

  const searchOrgInfo = event => {
    let _filteredOrgInfo

    if (!event.query.trim().length) {
      _filteredOrgInfo = data
    } else {
      _filteredOrgInfo = data.filter(option => {
        const query = event.query.toLowerCase()

        return (
          option[API.ORG_INFO_OBJECT.NAME].toLowerCase().includes(query)
          ||
          option[API.ORG_INFO_OBJECT.CODE].toLowerCase().includes(query)
        )
      })
    }

    setFilteredOrgInfo(_filteredOrgInfo)
  }

  return (
    <div className="grid">
      <div className="col-3" />
      <div className="col-6">
        <h1>{STEPS[3].pageTitle}</h1>
        <Divider />
        {WIZARD.ORG_INFO.description}
        {error && <Messages ref={displayMessages} />}
        <div className="field mt-4">
          <label htmlFor={WIZARD.ORG_INFO.ref} className="block">
            <b>{WIZARD.ORG_INFO.title}</b>
          </label>
          <AutoComplete
            multiple
            field="name"
            id={WIZARD.ORG_INFO.ref}
            disabled={loading || error}
            suggestions={filteredOrgInfo}
            itemTemplate={orgInfoTemplate}
            selectedItemTemplate={orgInfoTemplate}
            completeMethod={e => searchOrgInfo(e)}
            value={wizard[WIZARD.ORG_INFO.ref] !== null ? [wizard[WIZARD.ORG_INFO.ref]] : null}
            onChange={e => setWizard({
              type: WIZARD.ORG_INFO.ref,
              payload: e.value !== null ?
                e.value.length !== 0 ?
                  e.value.length > 1 ?
                    e.value[e.value.length - 1]
                    : e.value[0]
                  : null
                : null
            })}
          />
        </div>
        <div className="flex justify-content-end mt-4">
          <Button label={UI.NEXT} iconPos="right" icon="pi pi-arrow-right" onClick={() => navigate('/4')} />
        </div>
      </div>
      <ShowHideFAQ />
    </div>
  )
}

export default Step3
