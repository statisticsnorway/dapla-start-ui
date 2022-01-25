export const WIZARD = {
  TEAM_NAME: {
    title: 'Teamnavn',
    description: <>
      Teamets navn (f. eks: Team Brunost).
      <b> Dette kan ikke endres senere. </b>
      Det er OK å bruke store bokstaver og mellomrom her. Brukes kun for visning.
    </>,
    help: <>
      Navnet på et Dapla-team bør reflektere <em>domene - subdomene</em>. Her er noen eksempler:
      <ul>
        <li>Skatt Person</li>
        <li>Skatt Næring</li>
        <li>Kostra KVM</li>
      </ul>
    </>,
    ref: 'display_team_name',
    placeholder: 'Team Brunost'
  },
  MANAGER: {
    title: 'Teamansvarlig',
    description: 'Alle tilgjengelige rettigheter i Google prosjekter og tilhørende tjenester og data.',
    ref: 'manager',
    placeholder: 'abc@ssb.no'
  },
  DATA_PROTECTION_OFFICERS: {
    title: 'Kildedataansvarlige',
    description: 'Tilgang til alle data og administrering av bakke-sky synkronisering.',
    ref: 'data_protection_officers',
    placeholder: 'abc@ssb.no, def@ssb.no'
  },
  DEVELOPERS: {
    title: 'Utviklere',
    description: 'Tilgang til alle teamets data utenom bakke-sky synkroniserte data og kildedata.',
    ref: 'developers',
    placeholder: 'abc@ssb.no, def@ssb.no'
  },
  CONSUMERS: {
    title: 'Konsumenter',
    description: 'Lesetilgang til utdata.',
    ref: 'consumers',
    placeholder: 'abc@ssb.no, def@ssb.no'
  },
  SERVICES: {
    title: 'Tjenester',
    description: <p>
      Velg tjenestene teamet har behov for. Det er mulig å legge til tjenester senere, men det er en fordel om du
      identifiserer de du trenger allerede nå. Dersom du er usikker, spør oss
      på <a href="https://ssb-norge.slack.com/archives/C015E7B4YS0\">#hjelp_dapla</a>.
    </p>,
    items: [
      {
        label: 'Transfer Service',
        value: 'transfer_service',
        description: 'Overføre filer mellom prodsonen og Dapla'
      }
    ],
    ref: 'enabled_services',
    dataTestId: 'enabled_services_test_id'
  }
}
