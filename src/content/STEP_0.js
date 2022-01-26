import { Tooltip } from 'primereact/tooltip'

export const STEP_0 = {
  TEXT: <>
    <p>
      Dette er en veileder for å opprette et nytt Dapla-team.
    </p>
    <p>
      Her oppgir du informasjon om teamet, brukerne og tjenestene som skal tilgjengeliggjøres. Når du har sendt
      inn bestillingen, får du et <a href="https://statistics-norway.atlassian.net/browse/DS">Jira</a>-saksnummer
      der du kan følge status og eventuelt kommunisere andre behov. Ettersom prosessen fortsatt består av noen
      <Tooltip target=".manuelleStegTooltip" position="top" />
      <span
        className="manuelleStegTooltip"
        data-pr-tooltip="For eksempel må Kundeservice involveres for å få opprettet tilgangsgrupper"
      >
        <em> manuelle steg </em>
      </span>
      vil det kunne ta noe tid fra du bestiller til du kan logge inn.
    </p>
    <p>
      Nedenfor har vi samlet noen spørsmål og svar som forklarer litt mer om Dapla-team og prosessen med å komme
      i gang. Vi anbefaler at du leser gjennom disse før du starter veilederen. Send oss gjerne flere spørsmål
      på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> dersom noe er uklart.
    </p>
  </>
}
