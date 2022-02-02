import { Tooltip } from 'primereact/tooltip'

export const STEP_0 = {
  TEXT: <>
    <p>
      Dette er en veileder for å opprette et nytt Dapla-team.
    </p>
    <p>
      Her oppgir du informasjon om teamet, brukerne og tjenestene som skal tilgjengeliggjøres. Når du har sendt
      inn bestillingen, får du et saksnummer i vårt saksbehandlingssystem der du kan følge status og eventuelt
      kommunisere andre behov. Ettersom prosessen består av noen
      <Tooltip target=".manuelleStegTooltip" position="top" />
      <span
        className="manuelleStegTooltip"
        data-pr-tooltip="For eksempel involveres Kundeservice for å opprette tilgangsgrupper."
      >
        <em style={{ borderBottom: '1px dotted #000' }}> manuelle steg </em>
      </span>
      vil det kunne ta noe tid fra du bestiller til du kan logge inn. Flyten er beskrevet i bildet til høyre. Klikk
      på bildet for å se større versjon.
    </p>
    <p>
      Nedenfor har vi samlet noen spørsmål og svar som forklarer litt mer om Dapla-team og prosessen med å komme i
      gang. Vi anbefaler at du leser gjennom disse før du starter veilederen. Send oss gjerne flere spørsmål i
      kanalen <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> på Slack dersom noe er uklart.
    </p>
    <p>
      Hvis du ikke har tilgang til Slack kan du alternativt sende en epost
      til <a href="mailto:hjelp_dapla-aaaace52ybb7ih4k4mdp5sj7yy@ssb-norge.slack.com">denne adressen</a>.
    </p>
  </>
}
