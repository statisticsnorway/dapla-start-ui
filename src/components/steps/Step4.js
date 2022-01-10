import { Divider, Grid, Header, List, Segment, Table } from 'semantic-ui-react'

import { useWizardContext } from '../../context/AppContext'

function Step4 () {
  const { wizard } = useWizardContext()

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon="clipboard list" content="Oppsummering" />
        <Divider hidden />
        <Header size="huge" attached="top" icon="users" content="Team" />
        <Segment attached padded="very">
          <Table basic="very" size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Manager</Table.HeaderCell>
                <Table.HeaderCell>Databeskyttelsesansvarlig</Table.HeaderCell>
                <Table.HeaderCell>Utviklere</Table.HeaderCell>
                <Table.HeaderCell>Konsumenter</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell verticalAlign="top">{wizard.manager}</Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>
                    {wizard.dataProtectionOfficers.map(element =>
                      <List.Item>{element}</List.Item>
                    )}
                  </List>
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>
                    {wizard.developers.map(element =>
                      <List.Item>{element}</List.Item>
                    )}
                  </List>
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  <List>
                    {wizard.consumers.map(element =>
                      <List.Item>{element}</List.Item>
                    )}
                  </List>
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
