import {Accordion, Container, Grid, Header, Image, Popup} from 'semantic-ui-react'

function Step1 () {
  const panels = [
    {
      key: 'spm-hva-er-et-dapla-team',
      title: 'Hva er et Dapla-team?',
      content: {
        content: (
            <div>
              <p>
                Et Dapla-team er et arbeidsområde som fokuserer på statistikkproduksjon innen et fagfelt. Det er vanlig
                  å dele fagfeltene inn i såkalte <em>domener</em>, og ofte videre inn i <em>subdomener</em>. Fra
                  teorien bak <a href="https://amzn.to/3lQOFlH">Domain-Driven Design (DDD) </a> omtales et slikt
                  fagområde som en "avgrenset kontekst" (Bounded Context). Ettersom konteksten er avgrenset, er den
                  naturligvis også del av en større sammenheng. I vårt tilfelle anser vi Dapla-teamene som lukkede
                  kontekster som tilsammen representerer... Dapla - altså SSB sin dataplattform.
              </p>
              <p>
                  Dapla er riktignok også mer enn bare teamene. Det er en <dfn>dataplattform</dfn> fordi den bygges
                  basert på en arkitektur og et sett med tjenester som fasiliterer for effektive verktøy og prosesser
                  for statistikkproduksjon og datautveksling. Du kan finne mye mer om Dapla og
                  tjenestene <a href="https://docs.dapla.ssb.no/">her</a>.
              </p>
            </div>
        ),
      },
    },
    {
      key: 'spm-teamnavn',
      title: 'Hva bør jeg kalle teamet mitt?',
      content: {
        content: (
            <div>
              <p>
                Navnet på et Dapla-team bør reflektere <em>domene - subdomene</em>.
                Her er noen eksempler på eksisterende teamnavn:
              </p>
                <ul>
                    <li>skatt-person</li>
                    <li>skatt-naering</li>
                    <li>kostra-kvm</li>
                </ul>
                <p>
                Når man skal finne navn for et team, kan det kan være greit å legge til grunn at arbeidsgrupper og konstellasjoner
                av mennesker som jobber innenfor et fagfelt som oftest er mer flyktig enn fagfeltet selv. Dermed bør man unngå å benytte
                navn som f. eks "team-A", "prosjekt-vinter2021" eller "regnbue". Teamnavn bør ha et mer langsiktig perspektiv. Helst
                bør en velge navn som er selvstendige, meningsfulle og korte. Vi oppfordrer til at det benyttes forkortelelser eller
                akronymer dersom disse er innarbeidede eller selvforklarende.
              </p>
            </div>
        ),
      },
    },
    {
      key: 'spm-oppbygning',
      title: 'Hvordan settes et Dapla-team opp?',
      content: {
        content: (
            <div>
              <p>
                Hvert Dapla-team får opprettet et eget "prosjekt" i Google Cloud (GCP). Videre får hvert GCP-prosjekt provisjonert
                opp et sett med tjenester som knyttes til teamet. Som standard konfigureres et knippe med ulike
                tilgangsgrupper i AD, og disse synkroniseres videre til GCP (som "groups"). Det opprettes et sett med standard-bøtter
                (for fillagring) som bare kan aksesseres av brukere som er med i de ulike tilgangsgruppene. Man vil også kunne velge
                mellom andre tjenester.
              </p>
              <p>
                For å få gjort dette trenger vi en oversikt over teamets brukere og hvilke tilgangsgrupper brukerne skal være med i. Vi
                trenger også informasjon om hvilke Dapla-tjenester som er aktuelle for teamet å ta i bruk.
              </p>
            </div>
        ),
      },
    },
    {
      key: 'spm-flere-detaljer',
      title: 'OK, gi meg enda flere detaljer om hvordan dette fungerer...',
      content: {
        content: (
            <div>
                <p>
              Denne veilederen samler inn informasjon om navn på team, brukere, brukergrupper og tjenester. Basert på dette opprettes
              det et Infrastructure as Code (IaC) git-repo som beskriver i detalj hvordan GCP-infrastrukturen skal være vha av Terraform.
              Det sendes en forespørsel til Kundeservice for å få opprettet AD-grupper og synkronisert disse til GCP. Samtidig vil
              ansvarspersoner forespørres slik at nødvendige tilgangsbekreftelser og lignende blir klarert. Når alt dette er på plass,
              benyttes Atlantis for å foreta selve provisjoneringen av tjenestene. Etter at Atlantis-jobben er kjørt vil brukerne kunne
              logge inn og aksessere Dapla-tjenestene.
                </p>
            </div>
        ),
      },
    },
    {
      key: 'spm-ting-klart',
      title: 'Hvordan vet jeg når ting er klart?',
      content: {
        content: (
            <div>
                <p>
                  Det opprettes en <a href="https://statistics-norway.atlassian.net/browse/DS">Jira</a>-sak som følger
                    hele løpet fra du sender inn bestllingen, til dere kan logge inn. Du vil kunne følge med på at
                    tilgangsgrupper blir opprettet, git-repo for IaC kommer på plass og tjenestene blir provisjonert opp.
                </p>
            </div>
        ),
      },
    },
    {
      key: 'spm-hjelp',
      title: 'Hva om jeg trenger hjelp underveis?',
      content: {
        content: (
            <div>
              Snakk med oss på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> så finner vi ut av det.
            </div>
        ),
      },
    },
    {
      key: 'spm-endringer',
      title: 'Kan jeg bruke denne veilederen for å endre på et team (f.eks legge til flere tjenester?)',
      content: {
        content: (
            <div>
              Foreløpig er denne veilederen kun ment for opprettelesen av nye team. For å gjøre endringer på tjenestene vil du i neste
              omgang gjøre dette ved å gjøre endringer i repoet på GitHub. Dokumentasjon for hvordan dette gjøres vil komme på plass
              etter hvert. Snakk med oss på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> hvis du lurer på noe.
            </div>
        ),
      },
    },
  ]
  return (
    <>
      <Grid>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
            <Container text={true}>
                <Header dividing size="huge" content={"Velkommen!"} />
                <p>
                    Dette er en veileder for å opprette et nytt Dapla-team.
                </p>
                <p>
                    Her oppgir du informasjon om teamet, brukerne og tjenestene som skal tilgjengeliggjøres. Når du har sendt
                    inn bestillingen, får du et <a href="https://statistics-norway.atlassian.net/browse/DS">Jira</a>-saksnummer
                    der du kan følge status og eventuelt kommunisere andre behov. Ettersom prosessen fortsatt består av
                    noen <i data-tooltip="f. eks må Kundeservice involveres for å få opprettet tilgangsgrupper">manuelle steg </i>
                    vil det kunne ta noe tid fra du bestiller til du kan logge inn.
                </p>
                <p>
                    <Image src='img/process-flowchart.png' wrapped />
                </p>
                <p>
                    Nedenfor har vi samlet noen spørsmål og svar som forklarer litt mer om Dapla-team og prosessen med å komme i gang.
                    Vi anbefaler at du leser gjennom disse før du starter veilederen. Send oss gjerne flere spørsmål på
                    <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> dersom noe er uklart.
                </p>
                <Accordion defaultActiveIndex={0} panels={panels} styled={true}/>
            </Container>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Step1
