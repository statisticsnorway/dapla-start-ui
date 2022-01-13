export const WIZARD = {
  teamName: {
    title: 'Teamnavn',
    description: ''
  },
  manager: {
    title: 'Team-/domeneansvarlig',
    description: 'Alle tilgjengelige rettigheter i Google prosjekter og tilhørende tjenester og bøtter'
  },
  dpo: {
    title: 'Databeskyttelsesansvarlige',
    description: 'Utvidede rettigheter og tilganger til alle datatilstander og administrering av bakke-sky synkronisering'
  },
  developer: {
    title: 'Utviklere',
    description: 'Tilgang til Jupyter, lese- og skrivetilgang til alle teamets bøtter utenom bakke-sky synkronisering og upseudonymisert kildedata'
  },
  consumer: {
    title: 'Konsumenter',
    description: 'Lesetilgang til noen av teamets bøtter, primært klargjorte utdata'
  }
}

export const STEPS = {
  welcome: {
    icon: 'info',
    header: 'Kom i gang',
    description: 'Om denne veilederen'
  },
  team: {
    icon: 'users',
    header: 'Teamet',
    description: 'Teamets oppbygning og tilganger'
  },
  services: {
    icon: 'cogs',
    header: 'Tjenester',
    description: 'Ytterligere informasjon og tjenesteaktivering'
  },
  summary: {
    icon: 'clipboard list',
    header: 'Oppsummering',
    description: 'Bekreftelse og bestilling'
  }
}
