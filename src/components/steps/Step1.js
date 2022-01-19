import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Accordion, Button, Container, Divider, Grid, Header, Icon, Image } from 'semantic-ui-react'

import { LanguageContext } from '../../context/AppContext'
import { FAQ, UI } from '../../enums'

function Step1 () {
  const { language } = useContext(LanguageContext)

  const [imageBig, setImageBig] = useState(false)

  return (
    <>
      <Grid>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
          <Header dividing size="huge" content="Velkommen!" />
          <p>
            Dette er en veileder for å opprette et nytt Dapla-team.
          </p>
          <Image
            centered={imageBig}
            style={{ cursor: 'pointer' }}
            src="img/process-flowchart.png"
            size={imageBig ? 'huge' : 'medium'}
            floated={!imageBig ? 'right' : null}
            onClick={() => setImageBig(!imageBig)}
          />
          <p />
          <p>
            Her oppgir du informasjon om teamet, brukerne og tjenestene som skal tilgjengeliggjøres. Når du har sendt
            inn bestillingen, får du et <a href="https://statistics-norway.atlassian.net/browse/DS">Jira</a>-saksnummer
            der du kan følge status og eventuelt kommunisere andre behov. Ettersom prosessen fortsatt består av noen
            <i data-tooltip="f. eks må Kundeservice involveres for å få opprettet tilgangsgrupper"> manuelle steg </i>
            vil det kunne ta noe tid fra du bestiller til du kan logge inn.
          </p>
          <p>
            Nedenfor har vi samlet noen spørsmål og svar som forklarer litt mer om Dapla-team og prosessen med å komme
            i gang. Vi anbefaler at du leser gjennom disse før du starter veilederen. Send oss gjerne flere spørsmål på
            <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0"> #hjelp_dapla</a> dersom noe er uklart.
          </p>
          <Divider clearing />
          <Accordion defaultActiveIndex={-1} panels={FAQ} styled fluid />
          <Divider hidden />
          <Container fluid textAlign="right">
            <Button animated primary size="huge" as={Link} to="/2">
              <Button.Content visible>{UI.START[language]}</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Container>
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    </>
  )
}

export default Step1
