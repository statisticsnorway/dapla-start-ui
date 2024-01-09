export const WIZARD = {
  TEAM_NAME: {
    title: 'Teamnavn',
    description: <>
      Teamets navn (for eksempel: "Pålegg Brunost").
      <b> Dette kan endres senere. </b>

      <p><b>OBS:</b> Vi støtter ikke teamnavn som starter med "demo" så vennligst unngå dette.
        Det er OK å bruke store bokstaver, Æ/Ø/Å, og mellomrom her. Det genererte tekniske teamnavnet du kan se nedenfor
        vil <b>ikke kunne endres</b> senere men kan overstyres her og nå hvis ønskelig.
      </p>
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
    title: 'Teamansvarlig (manager)',
    description: 'Teamansvarlig(manager) skal være en seksjonssjef. (hvis du ikke finner seksjonssjefen din i søket, skriv inn deg selv og legg inn kommentar i siste boksen om dette).',
    ref: 'manager'
  },
  DATA_ADMINS: {
    title: 'Kildedataansvarlige (data-admins)',
    description: 'Privilegert tilgangsgruppe som kan gi seg selv tilgang til kildedata (sensitiv data) ved behov. Maks 3 personer.',
    ref: 'data_admins'
  },
  DEVELOPERS: {
    title: 'Utviklere (developers)',
    description: 'Tilgangsgruppe for alle de andre på teamet som ikke er kildedataansvarlig.',
    ref: 'developers'
  },
  OTHER_INFO: {
    title: 'Annen informasjon',
    description: 'Her legger du inn eventuelle kommentarer eller annen informasjon.',
    ref: 'other_info'
  },
  ORG_INFO: {
    title: 'Seksjonstilhørighet',
    summaryTitle: 'Hovedansvarlig seksjon',
    description: <p style={{ fontSize: '0.85rem' }} className="mb-4">
      Hovedansvarlig seksjon for teamet. I boksen under kan du søke på seksjonsnavn og seksjonsnummer. Fra listen som
      dukker opp under boksen kan du velge seksjon eller bruke piltastene og trykke Enter.
    </p>,
    ref: 'org_info'
  },
  SERVICES: {
    title: 'Tjenester',
    description: <p style={{ fontSize: '0.85rem' }} className="mb-4">
      Velg tjenestene teamet har behov for. Det er mulig å legge til tjenester senere, men det er en fordel om du
      identifiserer de du trenger allerede nå. Det vil komme flere tjenester
      etterhvert, som kan legges til for teamet når som helst.
    </p>,
    items: [
      {
        label: 'Transfer Service',
        value: 'transfer_service',
        description: 'Overføre filer mellom Produksjonssonen og Dapla'
      },
      {
        label: 'Automatisert kildedataprosessering',
        value: 'source_data_automation',
        description: 'Tjeneste for å automatisere overføring av kildedata'
      }
    ],
    ref: 'enabled_services'
  }
}
