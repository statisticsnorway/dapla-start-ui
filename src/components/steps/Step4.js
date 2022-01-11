import { Divider, Grid, Header, List, Segment, Table } from 'semantic-ui-react'

import { useWizardContext } from '../../context/AppContext'
import { STEPS, WIZARD } from '../../enums'

function Step4 () {
  const { wizard } = useWizardContext()

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon={STEPS.summary.icon} content={STEPS.summary.header} />
        <Divider hidden />
        <Header size="huge" attached="top" icon={STEPS.team.icon} content={STEPS.team.header} />
        <Segment attached padded="very">
          <Header size="large" content={wizard.teamName} />
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
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  )
}

export default Step4