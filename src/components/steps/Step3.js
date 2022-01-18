import { useContext, useEffect, useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon } from 'semantic-ui-react'
import { STEPS, UI } from '../../enums'
import { Link } from 'react-router-dom'
import { ApiContext, LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'


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
          directory: '',
        },
        repo: '',
        org: 'statisticsnorway',
      }),
    }
    if (Object.keys(wizard.services).length === 0) {
      fetch(`${api}/form`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
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
          user_inputs: userInputs,
        },
      ),
    }
    fetch(`${api}/form`, requestOptions)
      .then((response) => response.json())
      .then((newData) => {
        setCookiecutterData(newData)
        if(!newData.done){
          setUserInputs({ ...userInputs, [newData.next_key]: newData.next_value })
        }
      })
  }

  const setInput = (input, type, value) => {
    setWizard({ type: type, payload: value })
  }

  const formBuilder = () =>
    Object.entries(userInputs).map(([key, value]) => {
      if (cookiecutterData.form_schema[key].type === 'array') {
        return <Form.Dropdown
          selection
          value={userInputs[key]}
          label={cookiecutterData.form_schema[key].title}
          placeholder={key}
          options={cookiecutterData.form_schema[key].items.enum.map(option => ({
            key: option,
            text: option,
            value: option
          }))
          }
          onChange={(e, { value }) => {
            setUserInputs({ ...userInputs, [key]: value })
            setCookiecutterData({ ...cookiecutterData, user_inputs: { ...userInputs, [key]: value } })
            setInput('services', 'setServices', { ...cookiecutterData, user_inputs: { ...userInputs, [key]: value } })
          }}
        />
      }

      if (cookiecutterData.form_schema[key].type === 'string') {
        return <Form.Input
          value={userInputs[key]}
          label={cookiecutterData.form_schema[key].title}
          placeholder={key}
          onChange={(e, { value }) => {
            setUserInputs({ ...userInputs, [key]: value })
            setCookiecutterData({ ...cookiecutterData, user_inputs: { ...userInputs, [key]: value } })
            setInput('services', 'setServices', { ...cookiecutterData, user_inputs: { ...userInputs, [key]: value } })
          }}
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
