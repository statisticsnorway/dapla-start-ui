import { useLocation } from 'react-router-dom'
import { Container, Divider, Grid, Header, List } from 'semantic-ui-react'

function Step5 () {
  let location = useLocation()

  return (
    <Grid>
      <Grid.Column width={5} />
      <Grid.Column width={6}>
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <Header size="huge">
            Takk! Vi har mottatt bestillingen din! 🎉
            <Header.Subheader>
              Du kan følge fremdrift her:
            </Header.Subheader>
          </Header>
          <Header size="huge">
            <a href={location.state.self}>{location.state.key}</a>
          </Header>
          <Divider hidden style={{ marginBottom: '5rem' }} />
          <Container textAlign="left">
            <Header size="medium">
              Hva skjer nå?
            </Header>
            <div>
              Før ditt nye Dapla-team er klart er det dessverre noen manuelle steg som må til:
              <List bulleted>
                <List.Item>
                  Kundeservice må opprette nødvendige AD-grupper og brukerne legges til
                </List.Item>
                <List.Item>
                  GCP-ressurser må provisjoneres etter at AD-gruppene er tilgjengelig
                </List.Item>
              </List>
              <Divider hidden />
              Teamansvarlig vil få beskjed når alt er klart.
              <Divider hidden />
              Spør oss på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> om du lurer på
              noe,
              eller legg inn en kommentar på <a href={location.state.self}>saken</a>.
              <Divider hidden />
              Hilsen dine venner i Team Argus :)
            </div>
          </Container>
        </Container>
      </Grid.Column>
      <Grid.Column width={5} />
    </Grid>
  )
}

export default Step5
