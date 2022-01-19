import useAxios from 'axios-hooks'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import {
  Accordion,
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Ref,
  Sticky
} from 'semantic-ui-react'
import { ErrorMessage } from '@statisticsnorway/dapla-js-utilities'

import { ApiContext, LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'
import { FAQ, STEPS, UI } from '../../enums'

const formHeader = (title, description) =>
  <Header size="small">
    <Header.Content>
      {title}
      <Header.Subheader>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Header.Subheader>
    </Header.Content>
  </Header>

function Step3 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  const { api } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [info, setInfo] = useState([])
  const [userInputs, setUserInputs] = useState({})
  const [cookiecutterData, setCookiecutterData] = useState(null)

  const [{ error, loading }, execute] = useAxios({ method: 'POST' }, { manual: true, useCache: false })

  const appRefArea = useRef()

  useEffect(() => {
    const requestOptions = {
      url: `${api}/form`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        template: {
          repo: 'statisticsnorway/dapla-start-cookiecutter-config',
          directory: ''
        },
        repo: '',
        org: 'statisticsnorway'
      })
    }

    if (Object.keys(wizard.services).length === 0) {
      execute(requestOptions).then(response => {
        const data = response.data

        setCookiecutterData(data)
        setUserInputs({ ...userInputs, [data.next_key]: data.next_value })
      })
    } else {
      setCookiecutterData(wizard.services)
      setUserInputs(wizard.services.user_inputs)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formHeaderInfo = (title, description, infoField) =>
    <>
      <Header size="small">
        <Header.Content>
          {`${title} `}
          <Icon
            link
            name="info circle"
            color="blue"
            onClick={() => {
              if (info.includes(infoField)) {
                setInfo(info.filter(element => element !== infoField))
              } else {
                setInfo(info.concat([infoField]))
              }
            }}
          />
          <Header.Subheader>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Header.Subheader>
        </Header.Content>
      </Header>
      {info.includes(infoField) &&
        <Message info size="small">
          <div dangerouslySetInnerHTML={{ __html: cookiecutterData.form_schema[infoField].help }} />
        </Message>
      }
    </>

  const generateNextField = () => {
    const requestOptions = {
      url: `${api}/form`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(
        {
          ...cookiecutterData,
          user_inputs: userInputs
        }
      )
    }

    execute(requestOptions).then(response => {
      const newData = response.data

      setCookiecutterData(newData)

      if (!newData.done) {
        setUserInputs({ ...userInputs, [newData.next_key]: newData.next_value })
      } else {
        setWizard({ type: 'setServices', payload: newData })
      }
    })
  }

  const setInput = (key, type, value) => {
    setUserInputs({ ...userInputs, [key]: value })
    setCookiecutterData({ ...cookiecutterData, user_inputs: { ...userInputs, [key]: value } })
  }

  const formBuilder = () =>
    Object.entries(userInputs).map(([key, value]) => {
      if (cookiecutterData.form_schema[key].hasOwnProperty('deduced')) {
        return <Form.Field key={key} style={{ marginBottom: '2rem' }}>
          {formHeader(cookiecutterData.form_schema[key].title, cookiecutterData.form_schema[key].description)}
          <Message size="small" content={userInputs[key]} compact style={{ marginTop: 0 }} />
        </Form.Field>
      }

      if (cookiecutterData.form_schema[key].type === 'checklist') {
        return <Form.Field key={key} style={{ marginBottom: '1rem' }}>
          {formHeader(cookiecutterData.form_schema[key].title, cookiecutterData.form_schema[key].description)}
          {cookiecutterData.form_schema[key].items.map(item =>
            <Form.Checkbox
              key={item.label}
              style={{ marginTop: '1rem' }}
              label={`${item.label} (${item.description})`}
              checked={userInputs[key].includes(item.value)}
              onClick={() => {
                if (userInputs[key].includes(item.value)) {
                  setInput(key, 'setServices', userInputs[key].filter(element => element !== item.value))
                } else {
                  setInput(key, 'setServices', userInputs[key].concat([item.value]))
                }
              }}
            />
          )}
        </Form.Field>
      }

      if (cookiecutterData.form_schema[key].type === 'string') {
        return <Form.Input
          key={key}
          placeholder={key}
          value={userInputs[key]}
          style={{ marginBottom: '1rem' }}
          onChange={(e, { value }) => setInput(key, 'setServices', value)}
          label={cookiecutterData.form_schema[key].hasOwnProperty('help') ?
            formHeaderInfo(
              cookiecutterData.form_schema[key].title,
              cookiecutterData.form_schema[key].description,
              key
            )
            :
            formHeader(cookiecutterData.form_schema[key].title, cookiecutterData.form_schema[key].description)
          }
        />
      }

      return null
    })

  const displayButtons = () => {
    if (cookiecutterData !== null && cookiecutterData.done) {
      return <Container fluid textAlign="right">
        <Button animated primary size="huge" as={Link} to="/4">
          <Button.Content visible>{UI.NEXT[language]}</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Container>
    } else {
      return <Container fluid textAlign="left">
        <Button primary size="huge" onClick={() => generateNextField()} disabled={loading || error} loading={loading}>
          <Button.Content visible>{UI.CONTINUE[language]}</Button.Content>
          <Button.Content hidden>
          </Button.Content>
        </Button>
      </Container>
    }
  }

  return (
    <Grid>
      <Grid.Column width={4} />
      <Ref innerRef={appRefArea}>
        <Grid.Column width={8}>
          <Header dividing size="huge" icon={STEPS.services.icon} content={STEPS.services.header} />
          <Divider hidden />
          <Form size="large" loading={loading}>
            {(cookiecutterData !== null || userInputs !== null) && formBuilder()}
          </Form>
          <Divider hidden />
          {!loading && error && <ErrorMessage error={error} language={language} />}
          <Divider hidden />
          {displayButtons()}
        </Grid.Column>
      </Ref>
      <Grid.Column width={4}>
        <Sticky context={appRefArea}>
          <Accordion defaultActiveIndex={-1} panels={FAQ} styled fluid />
        </Sticky>
      </Grid.Column>
    </Grid>
  )
}

export default Step3
