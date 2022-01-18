import { useContext, useEffect, useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon } from 'semantic-ui-react'
import { STEPS, UI } from '../../enums'
import { Link } from 'react-router-dom'
import { ApiContext, LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'

const formHeader = (title, description) => <Header size="small" content={title} subheader={description} />

function Step3 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  const { api } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [cookiecutterData, setCookiecutterData] = useState(null)
  const [userInputs, setUserInputs] = useState({})

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template: {
          repo: 'statisticsnorway/dapla-start-cookiecutter-config',
          directory: ''
        },
        repo: '',
        org: 'statisticsnorway'
      })
    }

    if (Object.keys(wizard.services).length === 0) {
      fetch(`${api}/form`, requestOptions)
        .then(response => response.json())
        .then(data => {
          setCookiecutterData(data)
          setUserInputs({ ...userInputs, [data.next_key]: data.next_value })
        })
    } else {
      setCookiecutterData(wizard.services)
      setUserInputs(wizard.services.user_inputs)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateNextField = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          ...cookiecutterData,
          user_inputs: userInputs
        }
      )
    }

    fetch(`${api}/form`, requestOptions)
      .then(response => response.json())
      .then(newData => {
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
      if (cookiecutterData.form_schema[key].type === 'checklist') {
        return <Form.Field>
          <label>
            {formHeader(cookiecutterData.form_schema[key].title, cookiecutterData.form_schema[key].description)}
          </label>
          {cookiecutterData.form_schema[key].items.map(item =>
            <Form.Checkbox
              style={{ marginTop: '1rem' }}
              label={`${item.label} (${item.description})`}
              checked={userInputs[key].includes(item.value)}
              onClick={() => {
                if (userInputs[key].includes(item.value)) {
                  setInput(key, 'setServices', userInputs[key].filter(element => element === item.value))
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
          placeholder={key}
          value={userInputs[key]}
          disabled={cookiecutterData.form_schema[key].hasOwnProperty('deduced')}
          label={formHeader(cookiecutterData.form_schema[key].title, cookiecutterData.form_schema[key].description)}
          onChange={(e, { value }) =>
            setInput(key, 'setServices', value)
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
        <Button primary size="huge" onClick={() => generateNextField()}>
          <Button.Content visible>{UI.CONTINUE[language]}</Button.Content>
          <Button.Content hidden>
          </Button.Content>
        </Button>
      </Container>
    }
  }

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon={STEPS.services.icon} content={STEPS.services.header} />
        <Divider hidden />
        <Form size="large">
          {(cookiecutterData !== null || userInputs !== null) && formBuilder()}
        </Form>
        <Divider hidden />
        {displayButtons()}
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  )
}

export default Step3
