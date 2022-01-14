import { useEffect } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, Table } from 'semantic-ui-react'
import { STEPS, UI, WIZARD } from '../../enums'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'

const toHumanReadable = (name) => {
  if (!name) {
    return ''
  }
  const words = name.match(/[A-Za-z][^_\-A-Z]*/g) || []

  return words.map(capitalize).join(' ')
}

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

function Step3 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

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
          directory: '',
        },
        repo: '',
        org: 'statisticsnorway',
      }),
    }
    if (Object.keys(wizard.services).length === 0) {
      fetch(`${window.__ENV.REACT_APP_API}/form`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setCookiecutterData(data)
          setUserInputs({ ...userInputs, [data.next_key]: data.next_value })
        })
    } else {
      setCookiecutterData(wizard.services)
      setUserInputs(wizard.services.user_inputs)
    }

  }, [])

  const generateNextField = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          ...cookiecutterData,
          user_inputs: userInputs,
        },
      ),
    }
    fetch(`${window.__ENV.REACT_APP_API}/form`, requestOptions)
      .then((response) => response.json())
      .then((newData) => {
        setCookiecutterData(newData)
        setUserInputs({ ...userInputs, [newData.next_key]: newData.next_value })
      })
  }

  const setInput = (input, type, value) => {
    setWizard({ type: type, payload: value })
  }

  const formBuilder = () =>
    Object.entries(userInputs).map(([key, value]) => {
      if (Array.isArray(value)) {
        return <Form.Dropdown
          selection
          value={userInputs[key]}
          label={toHumanReadable(key)}
          placeholder={key}
          options={value.map(option => ({
            key: option,
            text: option,
            value: option
          }))
          }
          onChange={(e, { value }) => {
            setUserInputs({ ...userInputs, [key]: value })
            cookiecutterData.user_inputs = userInputs
            setInput('services', 'setServices', cookiecutterData)
          }}
        />
      }

      if (typeof value === 'string') {
        return <Form.Input
          value={userInputs[key]}
          label={toHumanReadable(key)}
          placeholder={key}
          onChange={(e, { value }) => {
            setUserInputs({ ...userInputs, [key]: value })
            cookiecutterData.user_inputs = userInputs
            setInput('services', 'setServices', cookiecutterData)
          }}
        />
      }
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
        <Button primary size="huge" onClick={generateNextField}>
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
        <Form>
          {
            (cookiecutterData !== null || userInputs !== null) && formBuilder()
          }
          {
            displayButtons()
          }

        </Form>
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  )
}

export default Step3
