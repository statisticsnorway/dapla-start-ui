import { UI } from './UI'

export const STEP_5 = {
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
      Spør oss på <a href={UI.SLACK_URL}>#hjelp_dapla</a> om du lurer på noe,
      eller legg inn en kommentar på <a href={link}>saken</a>.
    </p>
    <p>
      Hilsen dine venner i Team Argus 😊
    </p>
  </>,
  JIRA_URL: 'https://statistics-norway.atlassian.net/browse/'
}
