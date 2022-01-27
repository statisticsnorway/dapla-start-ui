export const STEP_5 = {
  HEADER: 'Takk! Vi har mottatt bestillingen din! 🎉',
  SUBHEADER: 'Du kan følge fremdrift her: ',
  TEXT: (link) => <>
    <h4>Hva skjer nå?</h4>
    Før ditt nye Dapla-team er klart er det noen manuelle steg som må til:
    <ul>
      <li>Kundeservice må opprette nødvendige AD-grupper og brukerne legges til</li>
      <li>Google-ressurser og tilganger settes opp etter at AD-gruppene er tilgjengelig</li>
    </ul>
    <p>
      Teamansvarlig vil få beskjed når alt er klart.
    </p>
    <p>
      Spør oss på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0">#hjelp_dapla</a> om du lurer på noe,
      eller legg inn en kommentar på <a href={link}>saken</a>.
    </p>
    <p>
      Hilsen dine venner i Team Argus 😊
    </p>
  </>
}
