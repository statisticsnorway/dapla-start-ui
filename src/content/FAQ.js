import { STEP_1 } from './STEP_1'

export const FAQ = [
  {
    header: 'Hva er et Dapla-team?',
    text: <>
      <p>
        Et Dapla-team fokuserer på statistikkproduksjon innen et eller flere emneområder på Dapla. Teamet er egentlig et
        arbeidsområde på Dapla, som gir medlemmene av teamet tilgang på teamet sine felles datalagre, roller og
        bakke-sky synkroniseringsområder.
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
        det benyttes forkortelser eller akronymer dersom disse er innarbeidede eller selvforklarende. Det er noen
        tekniske begrensninger som gjør at et teamnavn ikke kan være lenger enn 25 tegn.
      </p>
    </>
  },
  {
    header: 'Hva om jeg trenger hjelp underveis?',
    text: <p>
      Snakk med oss på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> så finner vi ut av
      det.
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
      Legg inn en kommentar på saken din (som du får en lenke til på slutten av veilederen), alternativt snakk med oss
      på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a>.
    </p>
  },
  {
    header: 'Kan jeg bruke denne veilederen for å gjøre endringer i et team på et senere tidspunkt?',
    text: <p>
      Foreløpig er denne veilederen kun ment for opprettelse av nye team. Endring på tjenestene foretas fra GitHub.
      Dokumentasjon for hvordan dette gjøres vil komme på plass etter hvert. Snakk med oss
      på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> hvis du lurer på noe.
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
