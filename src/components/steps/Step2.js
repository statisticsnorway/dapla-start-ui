import { useContext, useEffect, useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon } from 'semantic-ui-react'

import { LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'
import { UI } from '../../enums'
import { Link } from 'react-router-dom'

const addItem = value => ({
  key: value,
  text: value,
  value: value
})

const convertOptions = array =>
  array.map(value => ({
    key: value,
    text: value,
    value: value
  }))

const renderLabel = label => ({
  color: 'blue',
  content: label.text
})

function Step2 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  const { language } = useContext(LanguageContext)

  const [consumersOptions, setConsumersOptions] = useState(wizard.consumers)
  const [developersOptions, setDevelopersOptions] = useState(wizard.developers)
  const [dataProtectionOfficersOptions, setDataProtectionOfficersOptions] = useState(wizard.dataProtectionOfficers)

  useEffect(() => {
    if (wizard.dataProtectionOfficers.length !== 0) {
      setDataProtectionOfficersOptions(convertOptions(wizard.dataProtectionOfficers))
    } else {
      setDataProtectionOfficersOptions([])
    }

    if (wizard.developers.length !== 0) {
      setDevelopersOptions(convertOptions(wizard.developers))
    } else {
      setDevelopersOptions([])
    }

    if (wizard.consumers.length !== 0) {
      setConsumersOptions(convertOptions(wizard.consumers))
    } else {
      setConsumersOptions([])
    }
  }, [wizard])

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon="users" content="Team" />
        <Divider hidden />
        <Form size="big">
          <Form.Input
            label={<Header size="small" content="Manager"
                           subheader="Utvidede rettigheter i Google prosjekter og tilhørende tjenester" />}
            placeholder="Manager"
            value={wizard.manager}
            onChange={(e, { value }) => {
              setWizard({ type: 'setManager', payload: value })
            }}
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            label={<Header size="small" content="Databeskyttelsesansvarlig"
                           subheader="Utvidede rettigheter og tilganger til rådata og alle datatilstander" />}
            placeholder="Databeskyttelsesansvarlig"
            noResultsMessage={null}
            value={wizard.dataProtectionOfficers}
            options={dataProtectionOfficersOptions}
            additionLabel={`${UI.ADD[language]} `}
            renderLabel={renderLabel}
            onAddItem={(e, { value }) => setDataProtectionOfficersOptions([addItem(value), ...dataProtectionOfficersOptions])}
            onChange={(e, { value }) => {
              setWizard({ type: 'setDataProtectionOfficers', payload: value })
            }}
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            label={<Header size="small" content="Utviklere"
                           subheader="Tilgang til Jupyter, lese- og skrivetilgang til alle teamets bøtter" />}
            placeholder="Utviklere"
            noResultsMessage={null}
            value={wizard.developers}
            options={developersOptions}
            renderLabel={renderLabel}
            additionLabel={`${UI.ADD[language]} `}
            onAddItem={(e, { value }) => setDevelopersOptions([addItem(value), ...developersOptions])}
            onChange={(e, { value }) => {
              setWizard({ type: 'setDevelopers', payload: value })
            }}
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            label={<Header size="small" content="Konsumenter" subheader="Lesetilgang til noen av teamets bøtter" />}
            placeholder="Konsumenter"
            noResultsMessage={null}
            value={wizard.consumers}
            options={consumersOptions}
            renderLabel={renderLabel}
            additionLabel={`${UI.ADD[language]} `}
            onAddItem={(e, { value }) => setConsumersOptions([addItem(value), ...consumersOptions])}
            onChange={(e, { value }) => {
              setWizard({ type: 'setConsumers', payload: value })
            }}
          />
        </Form>
        <Divider hidden />
        <Container fluid textAlign="right">
          <Button animated primary size="huge" as={Link} to="/3">
            <Button.Content visible>Gå videre</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Container>
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  )
}

export default Step2
