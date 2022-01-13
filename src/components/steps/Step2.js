import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Accordion, Button, Container, Divider, Form, Grid, Header, Icon, Table } from 'semantic-ui-react'

import { LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'
import { STEPS, TEST_IDS, UI, WIZARD } from '../../enums'

const panels = [
  {
    key: 'what',
    title: 'Hva skjer her egentlig?',
    content: {
      content: (
        <>
          <p>
            Forklarende tekst?
          </p>
          <Table definition celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Full kontroll</Table.HeaderCell>
                <Table.HeaderCell>Upseudonymiserte data</Table.HeaderCell>
                <Table.HeaderCell>Administrere bakke-sky synkronisering</Table.HeaderCell>
                <Table.HeaderCell>Pseudonymiserte data</Table.HeaderCell>
                <Table.HeaderCell>Jupyter</Table.HeaderCell>
                <Table.HeaderCell>Klargjorte utdata</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{WIZARD.manager.title}</Table.Cell>
                {Array.from({ length: 6 }, (v, i) =>
                  <Table.Cell key={i} textAlign="center"><Icon name="check" color="green" /></Table.Cell>
                )}
              </Table.Row>
              <Table.Row>
                <Table.Cell>{WIZARD.dpo.title}</Table.Cell>
                <Table.Cell />
                {Array.from({ length: 5 }, (v, i) =>
                  <Table.Cell key={i} textAlign="center"><Icon name="check" color="green" /></Table.Cell>
                )}
              </Table.Row>
              <Table.Row>
                <Table.Cell>{WIZARD.developer.title}</Table.Cell>
                {Array.from({ length: 3 }, (v, i) => <Table.Cell key={i} />)}
                {Array.from({ length: 3 }, (v, i) =>
                  <Table.Cell key={i} textAlign="center"><Icon name="check" color="green" /></Table.Cell>
                )}
              </Table.Row>
              <Table.Row>
                <Table.Cell>{WIZARD.consumer.title}</Table.Cell>
                {Array.from({ length: 5 }, (v, i) => <Table.Cell key={i} />)}
                <Table.Cell textAlign="center"><Icon name="check" color="green" /></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      )
    }
  }
]

const emptyErrors = {
  teamName: '',
  manager: '',
  dpo: '',
  developer: '',
  consumer: ''
}

const addItemToOptions = item => ({
  key: item,
  text: item,
  value: item
})

const convertOptions = optionsArray => optionsArray.map(option => ({
  key: option,
  text: option,
  value: option
}))

const formHeader = text => <Header size="small" content={text.title} subheader={text.description} />

function Step2 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  const { language } = useContext(LanguageContext)

  const [errors, setErrors] = useState(emptyErrors)
  const [consumersOptions, setConsumersOptions] = useState(wizard.consumers)
  const [developersOptions, setDevelopersOptions] = useState(wizard.developers)
  const [dataProtectionOfficersOptions, setDataProtectionOfficersOptions] = useState(wizard.dataProtectionOfficers)

  useEffect(() => {
    setConsumersOptions(convertOptions(wizard.consumers))
    setDevelopersOptions(convertOptions(wizard.developers))
    setDataProtectionOfficersOptions(convertOptions(wizard.dataProtectionOfficers))
  }, [wizard])

  const checkInput = (type, value) => {
    if (type === 'teamName' && value.length > 22) {
      setErrors({
        ...errors,
        [type]: `${WIZARD.teamName.title} kan ikke være lenger enn 22 tegn, nå er det ${value.length}`
      })
    }

    if (type === 'manager' && !value.endsWith('@ssb.no')) {
      setErrors({ ...errors, [type]: `${value} er ugyldig SSB epost` })
    }
  }

  const setInput = (input, type, value) => {
    setErrors({ ...errors, [input]: '' })
    setWizard({ type: type, payload: value })
  }

  const addItem = (input, type, value) => {
    if (!value.endsWith('@ssb.no')) {
      setErrors({ ...errors, [type]: `${value} er ugyldig SSB epost` })
    } else {
      switch (input) {
        case 'dpo':
          setDataProtectionOfficersOptions([addItemToOptions(value), ...dataProtectionOfficersOptions])
          break

        case 'developer':
          setDevelopersOptions([addItemToOptions(value), ...developersOptions])
          break

        case 'consumer':
          setConsumersOptions([addItemToOptions(value), ...consumersOptions])
          break

        default:
      }
    }
  }

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon={STEPS.team.icon} content={STEPS.team.header} />
        <Accordion defaultActiveIndex={-1} panels={panels} fluid />
        <Divider />
        <Form size="big">
          <Form.Input
            value={wizard.teamName}
            label={formHeader(WIZARD.teamName)}
            placeholder={WIZARD.teamName.title}
            onBlur={e => checkInput('teamName', e.target.value)}
            error={errors.teamName !== '' && { content: errors.teamName, pointing: 'below' }}
            onChange={(e, { value }) =>
              setInput('teamName', 'setTeamName', value)
            }
          />
          <Form.Input
            value={wizard.manager}
            label={formHeader(WIZARD.manager)}
            placeholder={UI.EMAIL_PLACEHOLDER}
            onBlur={e => checkInput('manager', e.target.value)}
            error={errors.manager !== '' && { content: errors.manager, pointing: 'below' }}
            onChange={(e, { value }) =>
              setInput('manager', 'setManager', value)
            }
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            noResultsMessage={null}
            label={formHeader(WIZARD.dpo)}
            data-testid={TEST_IDS.DPO_DROPDOWN}
            value={wizard.dataProtectionOfficers}
            additionLabel={`${UI.ADD[language]} `}
            options={dataProtectionOfficersOptions}
            placeholder={`${UI.EMAIL_PLACEHOLDER}, ${UI.EMAIL_PLACEHOLDER}`}
            error={errors.dpo !== '' && { content: errors.dpo, pointing: 'below' }}
            onChange={(e, { value }) =>
              setInput('dpo', 'setDataProtectionOfficers', value)
            }
            onAddItem={(e, { value }) =>
              addItem('dataProtectionOfficers', 'dpo', value)
            }
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            noResultsMessage={null}
            value={wizard.developers}
            options={developersOptions}
            label={formHeader(WIZARD.developer)}
            additionLabel={`${UI.ADD[language]} `}
            data-testid={TEST_IDS.DEVELOPER_DROPDOWN}
            placeholder={`${UI.EMAIL_PLACEHOLDER}, ${UI.EMAIL_PLACEHOLDER}`}
            error={errors.developer !== '' && { content: errors.developer, pointing: 'below' }}
            onChange={(e, { value }) =>
              setInput('developer', 'setDevelopers', value)
            }
            onAddItem={(e, { value }) =>
              addItem('developer', 'developer', value)
            }
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            noResultsMessage={null}
            value={wizard.consumers}
            options={consumersOptions}
            label={formHeader(WIZARD.consumer)}
            additionLabel={`${UI.ADD[language]} `}
            data-testid={TEST_IDS.CONSUMER_DROPDOWN}
            placeholder={`${UI.EMAIL_PLACEHOLDER}, ${UI.EMAIL_PLACEHOLDER}`}
            error={errors.consumer !== '' && { content: errors.consumer, pointing: 'below' }}
            onChange={(e, { value }) =>
              setInput('consumer', 'setConsumers', value)
            }
            onAddItem={(e, { value }) =>
              addItem('consumer', 'consumer', value)
            }
          />
        </Form>
        <Divider hidden />
        <Container fluid textAlign="right">
          <Button animated primary size="huge" as={Link} to="/3">
            <Button.Content visible>{UI.NEXT[language]}</Button.Content>
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
