import { UI } from './UI'

export const WIZARD = {
  TEAM_NAME: {
    title: 'Teamnavn',
    description: <>
      Teamets navn (for eksempel: "Pålegg Brunost").
      <b> Dette kan endres senere. </b>
      Det er OK å bruke store bokstaver, Æ/Ø/Å, og mellomrom her. Det genererte tekniske teamnavnet du kan se nedenfor
      vil <b>ikke kunne endres</b> senere men kan overstyres her og nå hvis ønskelig.
    </>,
    ref: 'display_team_name'
  },
  UNIFORM_TEAM_NAME: {
    title: 'Teknisk teamnavn',
    description: 'Her tillates bare små bokstaver, bindestrek og ikke æ/ø/å.',
    override: 'override_uniform_team_name',
    ref: 'uniform_team_name',
    max_chars: 17
  },
  MANAGER: {
    title: 'Teamansvarlig',
    description: 'Ingen tilganger.',
    ref: 'manager'
  },
  DATA_ADMINS: {
    title: 'Kildedataansvarlige',
    description: 'Tilgang til alle data og administrering av bakke-sky synkronisering.',
    ref: 'data_admins'
  },
  DEVELOPERS: {
    title: 'Utviklere',
    description: 'Tilgang til alle teamets data utenom kildedata. Ikke tilgang til bakke-sky synkronisering.',
    ref: 'developers'
  },
  CONSUMERS: {
    title: 'Konsumenter',
    description: 'Kun lesetilgang til delte data.',
    ref: 'consumers'
  },
  SUPPORT: {
    ref: 'support'
  },
  OTHER_INFO: {
    title: 'Annen informasjon',
    description: 'Her legger du inn eventuelle kommentarer eller annen informasjon.',
    ref: 'other_info'
  },
  SERVICES: {
    title: 'Tjenester',
    description: <p style={{ fontSize: '0.85rem' }} className="mb-4">
      Velg tjenestene teamet har behov for. Det er mulig å legge til tjenester senere, men det er en fordel om du
      identifiserer de du trenger allerede nå. Dersom du er usikker, spør oss
      på <a href={UI.SLACK_URL}>#hjelp_dapla</a>. Det vil komme flere tjenester
      etterhvert, som kan legges til for teamet når som helst. Foreløpig er det kun <em>Transfer Service</em> som
      finnes.
    </p>,
    items: [
      {
        label: 'Transfer Service',
        value: 'transfer_service',
        description: 'Overføre filer mellom Produksjonssonen og Dapla'
      }
    ],
    ref: 'enabled_services'
  }
}
