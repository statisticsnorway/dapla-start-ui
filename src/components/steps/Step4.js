import useAxios from 'axios-hooks'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, List, Segment, Table } from 'semantic-ui-react'
import { ErrorMessage } from '@statisticsnorway/dapla-js-utilities'

import { ApiContext, LanguageContext, useWizardContext } from '../../context/AppContext'
import { API } from '../../configurations'
import { APPROVER, STEPS, UI, WIZARD } from '../../enums'

const environments = ['dev', 'staging', 'prod', 'transfer-service']

const technical = ttn => environments.reduce((a, v) => {
  const thing = {
    projectName: `${v}-${ttn}`,
    buckets: v !== 'transfer-service' ?
      ['kilde', 'produkt'].map(bucket => `ssb-${v}-${bucket}-data-${ttn}`)
      :
      ['transfer-service'].map(bucket => `${ttn}-${bucket}`)
  }
  return { ...a, [v]: thing }
}, {})

function Step4 () {
  const { wizard } = useWizardContext()

  const { api } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [technicalInfo] = useState(technical(wizard.services.user_inputs.team_name))

  const [{ error, loading }, execute] = useAxios({ method: 'POST' }, { manual: true, useCache: false })

  let navigate = useNavigate()

  const sendOrder = async () => {
    const payload = {
      display_team_name: wizard.services.user_inputs.display_team_name,
      uniform_team_name: wizard.services.user_inputs.team_name,
      manager_email_list: [wizard.manager],
      dpo_email_list: wizard.dataProtectionOfficers,
      dev_email_list: wizard.developers,
      consumer_email_list: wizard.consumers,
      service_list: wizard.services.user_inputs.enabled_services,
      approver: wizard.approver,
      technical_info: technicalInfo
    }

    await execute({
      data: payload,
      url: `${api}${API.CREATE_JIRA}`
    }).then(response => {
      navigate('/5', { replace: false, state: response.data })
    }).catch(err => console.log(err))
  }

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon={STEPS.summary.icon} content={STEPS.summary.header} />
        <Divider hidden />
        <Header
          size="huge"
          attached="top"
          icon={STEPS.team.icon}
          content={wizard.services.user_inputs.display_team_name}
        />
        <Segment attached padded="very">
          <Table basic="very" size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{WIZARD.manager.title}</Table.HeaderCell>
                <Table.HeaderCell>{WIZARD.dpo.title}</Table.HeaderCell>
                <Table.HeaderCell>{WIZARD.developer.title}</Table.HeaderCell>
                <Table.HeaderCell>{WIZARD.consumer.title}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell verticalAlign="top">{wizard.manager}</Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>
                    {wizard.dataProtectionOfficers.map(element => <List.Item key={element}>{element}</List.Item>)}
                  </List>
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>{wizard.developers.map(element => <List.Item key={element}>{element}</List.Item>)}</List>
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>{wizard.consumers.map(element => <List.Item key={element}>{element}</List.Item>)}</List>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Divider hidden />
          <i>{`${APPROVER.title}: `}</i>{wizard.approver}
        </Segment>
        <Divider hidden />
        <Header size="huge" attached="top" icon={STEPS.services.icon} content={STEPS.services.header} />
        <Segment attached padded="very">
          <List>
            {wizard.services.user_inputs.enabled_services.map(service =>
              <List.Item
                key={service}
                icon={{ name: 'check', color: 'green' }}
                content={wizard.services.form_schema.enabled_services.items.filter(item => item.value === service)[0].label}
              />
            )}
          </List>
        </Segment>
        <Divider hidden />
        <Header size="huge" attached="top" icon="wrench" content="Teknisk" />
        <Segment attached padded="very">
          <Grid columns="equal">
            <Grid.Column>
              <Header size="medium" content="GCP prosjekter" />
              <List relaxed="very">
                {Object.entries(technicalInfo).map(([key, value]) =>
                  <List.Item key={key}>
                    <Header size="small" content={value.projectName} />
                    <Header size="tiny" content="Bøtter:" style={{ fontWeight: 'normal' }} />
                    <List.List>
                      {value.buckets.map(bucket =>
                        <List.Item key={bucket} content={bucket} />
                      )}
                    </List.List>
                  </List.Item>
                )}
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header size="medium" content="GitHub infrastruktur-repo" />
              <p>{`https://github.com/statisticsnorway/${wizard.services.user_inputs.project_name}`}</p>
              <Header size="medium" content="AD-grupper" />
              <List>
                {Object.entries(WIZARD).map(([key, value]) =>
                  <List.Item>{`${wizard.services.user_inputs.team_name}-${value.name}@ssb.no`}</List.Item>
                )}
              </List>
            </Grid.Column>
          </Grid>
        </Segment>
        <Divider hidden />
        {!loading && error && <ErrorMessage error={error} language={language} />}
        <Container fluid textAlign="right">
          <Button animated primary size="huge" onClick={() => sendOrder()} disabled={loading} loading={loading}>
            <Button.Content visible>{UI.FINISH[language]}</Button.Content>
            <Button.Content hidden>
              <Icon name="check" />
            </Button.Content>
          </Button>
        </Container>
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  )
}

export default Step4
