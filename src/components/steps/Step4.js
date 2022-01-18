import useAxios from 'axios-hooks'
import { useContext, useState } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, List, Segment, Table } from 'semantic-ui-react'
import { ErrorMessage } from '@statisticsnorway/dapla-js-utilities'

import { ApiContext, LanguageContext, useWizardContext } from '../../context/AppContext'
import { API } from '../../configurations'
import { STEPS, UI, WIZARD } from '../../enums'

function Step4 () {
  const { wizard } = useWizardContext()

  const { api } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [done, setDone] = useState(false)

  const [{ error, loading }, execute] = useAxios({ method: 'POST' }, { manual: true, useCache: false })

  const sendOrder = async () => {
    const payload = {
      display_team_name: wizard.services.user_inputs.display_team_name,
      uniform_team_name: wizard.services.user_inputs.team_name,
      manager_email_list: [wizard.manager],
      dpo_email_list: wizard.dataProtectionOfficers,
      dev_email_list: wizard.developers,
      consumer_email_list: wizard.consumers,
      service_list: wizard.services.user_inputs.enable_transfer_service === 'yes' ? ['transfer service'] : []
    }

    await execute({
      data: payload,
      url: `${api}${API.CREATE_JIRA}`
    }).then(response => {
      console.log(response)
      setDone(true)
    })
  }

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon={STEPS.summary.icon} content={STEPS.summary.header} />
        <Divider hidden />
        <Header size="huge" attached="top" icon={STEPS.team.icon} content={STEPS.team.header} />
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
                  <List>{wizard.dataProtectionOfficers.map(element => <List.Item>{element}</List.Item>)}</List>
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>{wizard.developers.map(element => <List.Item>{element}</List.Item>)}</List>
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>{wizard.consumers.map(element => <List.Item>{element}</List.Item>)}</List>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Divider hidden />
        <Header size="huge" attached="top" icon={STEPS.services.icon} content={STEPS.services.header} />
        <Segment attached padded="very">
          <Table basic="very" size="large">
            <Table.Header>
              <Table.Row>
                {(Object.entries(wizard.services).length > 0) && Object.entries(wizard.services.form_schema)
                  .map(([key, value]) => <Table.HeaderCell>{value.title}</Table.HeaderCell>)
                }
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {(Object.entries(wizard.services).length > 0) && Object.entries(wizard.services.user_inputs)
                  .map(([key, value]) =>
                    <Table.Cell>
                      {Array.isArray(value) ?
                        <List>
                          {value.map(element => <List.Item>{element}</List.Item>)}
                        </List>
                        :
                        value
                      }
                    </Table.Cell>
                  )
                }
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Divider hidden />
        {!loading && error && <ErrorMessage error={error} language={language} />}
        <Container fluid textAlign="right">
          <Button animated primary size="huge" onClick={() => sendOrder()} disabled={done || loading} loading={loading}>
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
