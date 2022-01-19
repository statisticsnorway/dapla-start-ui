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
  Image,
  Message,
  Ref,
  Sticky,
  Table
} from 'semantic-ui-react'

import { LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'
import { APPROVER, FAQ, STEPS, TEST_IDS, UI, WIZARD } from '../../enums'

const panels = [
  {
    key: 'what',
    title: 'Hva skjer her egentlig?',
    content: {
      content: (
        <>
          <p>
            Her får du muligheten til å fylle teamet med medlemmer. Teamet er delt i fire roller som innehar
            forskjellige tilgangsnivåer. Tabellen under forsøker å gi en oversikt over hvilke roller som gir hvilke
            tilganger. Medlemmer i teamet angis innenfor de forskjellige områdene med vanlig kortform av SSB epost.
            <b> Det som fylles inn her kan endres senere.</b>
          </p>
          <Table definition celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Full kontroll</Table.HeaderCell>
                <Table.HeaderCell>Kildedata (upseudonymisert)</Table.HeaderCell>
                <Table.HeaderCell>Administrere bakke-sky synkronisering</Table.HeaderCell>
                <Table.HeaderCell>Inndata</Table.HeaderCell>
                <Table.HeaderCell>Utdata</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{WIZARD.manager.title}</Table.Cell>
                {Array.from({ length: 5 }, (v, i) =>
                  <Table.Cell key={i} textAlign="center"><Icon name="check" color="green" /></Table.Cell>
                )}
              </Table.Row>
              <Table.Row>
                <Table.Cell>{WIZARD.dpo.title}</Table.Cell>
                <Table.Cell negative />
                {Array.from({ length: 4 }, (v, i) =>
                  <Table.Cell key={i} textAlign="center"><Icon name="check" color="green" /></Table.Cell>
                )}
              </Table.Row>
              <Table.Row>
                <Table.Cell>{WIZARD.developer.title}</Table.Cell>
                {Array.from({ length: 3 }, (v, i) => <Table.Cell key={i} negative />)}
                {Array.from({ length: 2 }, (v, i) =>
                  <Table.Cell key={i} textAlign="center"><Icon name="check" color="green" /></Table.Cell>
                )}
              </Table.Row>
              <Table.Row>
                <Table.Cell>{WIZARD.consumer.title}</Table.Cell>
                {Array.from({ length: 4 }, (v, i) => <Table.Cell key={i} negative />)}
                <Table.Cell textAlign="center"><Icon name="check" color="green" /></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Image src="img/data-states.png" size="huge" centered />
        </>
      )
    }
  }
]

const emptyErrors = {
  manager: '',
  dpo: '',
  developer: '',
  consumer: '',
  approver: ''
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

const defaultInfo = { dpo: '' }

function Step2 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  const { language } = useContext(LanguageContext)

  const [errors, setErrors] = useState(emptyErrors)
  const [info, setInfo] = useState(defaultInfo)
  const [consumersOptions, setConsumersOptions] = useState(wizard.consumers)
  const [developersOptions, setDevelopersOptions] = useState(wizard.developers)
  const [dataProtectionOfficersOptions, setDataProtectionOfficersOptions] = useState(wizard.dataProtectionOfficers)

  const appRefArea = useRef()

  useEffect(() => {
    setConsumersOptions(convertOptions(wizard.consumers))
    setDevelopersOptions(convertOptions(wizard.developers))
    setDataProtectionOfficersOptions(convertOptions(wizard.dataProtectionOfficers))
  }, [wizard])

  const formHeaderInfo = (text, infoField) =>
    <>
      <Header
        size="small"
        subheader={text.description}
        content={<span>
          {`${text.title} `}
          <Icon
            link
            name="info circle"
            color="blue"
            onClick={() => info[infoField] !== '' ?
              setInfo(defaultInfo)
              :
              setInfo({ ...info, [infoField]: WIZARD[infoField].info })
            }
          />
        </span>}
      />
      {info[infoField] !== '' && <Message info content={info[infoField]} />}
    </>

  const checkInput = (type, value) => {
    if ((type === 'manager' || type === 'approver') && !value.endsWith('@ssb.no')) {
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
      <Grid.Column width={4} />
      <Ref innerRef={appRefArea}>
        <Grid.Column width={8}>
          <Header dividing size="huge" icon={STEPS.team.icon} content={STEPS.team.header} />
          <Accordion defaultActiveIndex={-1} panels={panels} fluid styled />
          <Divider hidden />
          <Form size="large">
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
              label={formHeaderInfo(WIZARD.dpo, 'dpo')}
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
            <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
            <Form.Input
              value={wizard.approver}
              label={formHeader(APPROVER)}
              placeholder={UI.EMAIL_PLACEHOLDER}
              onBlur={e => checkInput('approver', e.target.value)}
              error={errors.approver !== '' && { content: errors.approver, pointing: 'below' }}
              onChange={(e, { value }) =>
                setInput('approver', 'setApprover', value)
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
      </Ref>
      <Grid.Column width={4}>
        <Sticky context={appRefArea}>
          <Accordion defaultActiveIndex={-1} panels={FAQ} styled fluid />
        </Sticky>
      </Grid.Column>
    </Grid>
  )
}

export default Step2
