import { UI } from './UI'

export const STEP_6 = {
  HEADER: 'Takk! Vi har mottatt bestillingen din! 🎉',
  SUBHEADER: 'Du kan følge fremdrift her: ',
  TEXT: link => <>
    <h4>Hva skjer nå?</h4>
    Før ditt nye Dapla-team er klart er det noe småtteri som må til:
    <ol>
      <li>Kundeservice oppretter tilgangsgrupper</li>
      <li>Når tilgangsgruppene er klare kan resten av infrastrukturen settes opp</li>
    </ol>
    <p>
      Teamansvarlig vil få beskjed når alt er klart.
    </p>
    <p>
      Send en epost til <a href={UI.KUNDESERVICE_MAIL}>Kundeservice</a> om du lurer på noe,
      eller legg inn en kommentar på <a href={link}>saken</a>.
    </p>
    <p>
      Når du og teamet ditt er i gang på Dapla kan det være lurt å ta en titt
      innom <a href={UI.DAPLA_GUIDE_URL}>veilederen</a> som har mye nyttig informasjon om hvordan komme i gang på Dapla.
    </p>
    <p>
      Hilsen dine venner i Team Statistikktjenester 😊
    </p>
  </>,
  JIRA_URL: 'https://statistics-norway.atlassian.net/browse/'
}
