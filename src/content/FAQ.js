import { STEP_1 } from './STEP_1'
import { UI } from './UI'
import { WIZARD } from './WIZARD'

export const FAQ = [
  {
    header: 'Hva er et Dapla-team?',
    text: <>
      <p>
        Et Dapla-team fokuserer på statistikkproduksjon innen et eller flere emneområder på Dapla. Teamet er egentlig et
        arbeidsområde på Dapla, som gir medlemmene av teamet tilgang på teamet sine felles datalagre, roller og
        bakke-sky synkroniseringsområder. Mer informasjon finner du i 
        <a href="https://probable-waddle-o4w1og1.pages.github.io/statistikkere/hva-er-dapla-team.html">Dapla-manualen.</a>
      </p>
      <p>
        Dapla er en <dfn>dataplattform</dfn> fordi den bygges basert på en arkitektur og et sett med tjenester som
        fasiliterer for effektive verktøy og prosesser for statistikkproduksjon og datautveksling.
      </p>
    </>
  },
  {
    header: 'Hva bør jeg kalle teamet?',
    text: <>
      {STEP_1.TEXT}
      <p>
        Når man skal finne navn for et team, kan det kan være greit å legge til grunn at arbeidsgrupper og
        konstellasjoner av mennesker er mer flyktige enn emneområdene (domenene) de jobber med. Dermed bør man unngå å
        benytte navn som for eksempel "Team A", "Prosjekt Vinter 2021" eller "Regnbue". Teamnavn bør ha et mer
        langsiktig perspektiv. Helst bør en velge navn som er selvstendige, meningsfulle og korte. Vi oppfordrer til at
        det benyttes forkortelser eller akronymer dersom disse er innarbeidede eller selvforklarende.
      </p>
      <h3 className="mt-4">Lengde og forkortelser</h3>
      <p>
        Teamnavnet kan <b>ikke</b> overskride{` ${WIZARD.UNIFORM_TEAM_NAME.max_chars}`} tegn av tekniske årsaker
        dessverre. Dersom navnet til teamet er langt anbefaler vi å forkorte den mest generelle delen av navnet til et
        trebokstavers "flyplassnavn". For eksempel, "Grunnopplæring Grunnskole" som er 25 tegn kan bli til "GRO
        Grunnskole" som er 14 tegn. Dersom domenet allerede er en forkortelse eller sammenslåing (for eksempel "Kostra"
        for "Kommune Stat Rapportering") kan man bruke et "flyplassnavn" for subdomenet istedenfor for å korte ned
        navnet, slik "Kostra KVM" har gjort.
      </p>
      <p>
        <b>NB!</b> Dersom det finnes andre team i deres domene som er eller skal på Dapla, vær sikker på at dere bruker
        samme "flyplassnavn" for domenet når dere oppretter team.
      </p>
    </>
  },
  {
    header: 'Hva om jeg trenger hjelp underveis?',
    text: <p>
      Send en epost til <a href={UI.KUNDESERVICE_MAIL}>Kundeservice</a>, eller still spørsmål på 
      <a href="https://web.yammer.com/main/org/ssb.no/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxNjk5NzMyNjg0ODAifQ/all">Viva Engage</a>, 
      så finner vi ut av det.
    </p>
  },
  {
    header: 'Hvordan kan jeg se status på bestillingen?',
    text: <p>
      Du kan følge bestillingen din i
      vårt <a href="https://statistics-norway.atlassian.net/browse/DS">saksbehandlingssystem</a>,
      som følger hele løpet fra du sender inn bestillingen, til alt er på plass.
    </p>
  },
  {
    header: 'Hva om jeg ønsker å gjøre endringer på bestillingen?',
    text: <p>
      Legg inn en kommentar på saken din (som du får en lenke til på slutten av veilederen), alternativt send en epost
      til <a href={UI.KUNDESERVICE_MAIL}>Kundeservice</a>.
    </p>
  },
  {
    header: 'Kan jeg bruke denne veilederen for å gjøre endringer i et team på et senere tidspunkt?',
    text: <p>
      Foreløpig er denne veilederen kun ment for opprettelse av nye team. Endring på tjenestene foretas fra GitHub.
      Dokumentasjon for hvordan dette gjøres vil komme på plass etter hvert.
    </p>
  },
  {
    header: 'Hvordan settes et Dapla-team opp?',
    text: <>
      <p>
        Hvert Dapla-team får opprettet et eller flere prosjekter i Google Cloud Platform (GCP) som er knyttet til
        Byråets IT-plattform (BiP). Videre får hvert prosjekt et sett med tjenester og tilganger som knyttes til teamet.
        Det opprettes et sett med datalagringsområder (kalt "bøtter" i GCP) som bare kan aksesseres av brukere som er
        med i teamets tilgangsgrupper.
      </p>
      <p>
        For å få gjort dette trenger vi en oversikt over teamets medlemmer og hvilke tilgangsgrupper medlemmene skal
        være med i. Vi trenger også informasjon om hvilke Dapla-tjenester som er aktuelle for teamet å ta i bruk. Derfor
        denne veilederen for bestilling av et Dapla-team.
      </p>
    </>
  },
  {
    header: 'OK, gi meg tekniske detaljer...',
    text: <p>
      Denne veilederen samler inn informasjon om navn på team, brukere, tilgangsgrupper og tjenester. Basert på dette
      opprettes det et Infrastructure as Code (IaC) repository i GitHub. Her defineres i detalj hvordan
      GCP-infrastrukturen skal være ved hjelp av kodespråket Terraform. Det sendes en forespørsel til Kundeservice for å
      få opprettet tilgangsgrupper i Active Directory (AD) som synkroniseres til GCP. Når alt dette er på plass,
      benyttes Atlantis for å foreta selve opprettelsen av tjenestene. Etter at Atlantis-jobben er kjørt vil brukerne
      kunne logge inn og aksessere Dapla-tjenestene.
    </p>
  }
]
