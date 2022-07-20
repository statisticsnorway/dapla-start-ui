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
    if (Array.isArray(response)) {
      summary = JSON.stringify(response, null, 2)
    } else {
      summary = response
    }
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

export const HELP_MESSAGE = data => {
  return ({
    sticky: true,
    closable: false,
    severity: 'info',
    summary: 'Ettersom noe gikk galt så kan du kopiere den tekniske bestillingen og sende den til oss.',
    detail: <Button
      label="Kopier"
      iconPos="right"
      icon="pi pi-copy"
      className="p-button-text ml-2"
      onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
    />
  })
}

export const createUniformWord = word => {
  const trimSpaces = word.toLowerCase().trimStart().trimEnd()
  const removePrefixAndSpaces = trimSpaces.replaceAll('team ', '').replaceAll(' ', '-')

  return removePrefixAndSpaces.replaceAll('æ', 'ae').replaceAll('ø', 'oe').replaceAll('å', 'aa')
}
