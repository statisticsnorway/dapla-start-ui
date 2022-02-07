import { Button } from 'primereact/button'

import { UI } from '../content'

export const API = {
  CREATE_JIRA: '/create_jira',
  GET_USERS: '/users',
  MEMBER_OBJECT: {
    NAME: 'name',
    EMAIL: 'email',
    EMAIL_SHORT: 'email_short'
  }
}

export const ERROR_MESSAGE = (error, refetch, response = null) => {
  let summary
  let severity = 'warn'

  if (response) {
    summary = response
  } else {
    const errorObject = error.toJSON()

    summary = `${errorObject.name}: ${errorObject.message}`
    severity = errorObject.status === null ? 'error' : 'warn'
  }

  return ({
    sticky: true,
    closable: false,
    summary: summary,
    severity: severity,
    detail: <Button
      iconPos="right"
      icon="pi pi-refresh"
      label={UI.TRY_AGAIN}
      className="p-button-text"
      onClick={() => refetch()}
      style={{ marginLeft: '1rem' }}
    />
  })
}
