const chipsPlaceholder = 'abc@ssb.no, def@ssb.no'

export const WIZARD = {
  TEAM_NAME: {
    title: 'Teamnavn',
    description: <>
      Teamets navn (f. eks: "Team Pålegg Brunost").
      <b> Dette kan ikke endres senere. </b>
      Det er OK å bruke store bokstaver, Æ/Ø/Å, og mellomrom her. Brukes kun for visning.
    </>,
    ref: 'display_team_name',
    placeholder: 'Team Pålegg Brunost'
  },
  MANAGER: {
    title: 'Teamansvarlig',
    description: 'Full tilgang til teamets prosjekt med tilhørende tjenester og data.',
    ref: 'manager',
    placeholder: 'abc@ssb.no'
  },
  DATA_PROTECTION_OFFICERS: {
    title: 'Kildedataansvarlige',
    description: 'Tilgang til alle data og administrering av bakke-sky synkronisering.',
    ref: 'data_protection_officers',
    placeholder: chipsPlaceholder
  },
  DEVELOPERS: {
    title: 'Utviklere',
    description: 'Tilgang til alle teamets data utenom bakke-sky synkroniserte data og kildedata.',
    ref: 'developers',
    placeholder: chipsPlaceholder
  },
  CONSUMERS: {
    title: 'Konsumenter',
    description: 'Lesetilgang til utdata.',
    ref: 'consumers',
    placeholder: chipsPlaceholder
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
    ref: 'enabled_services'
  }
}
