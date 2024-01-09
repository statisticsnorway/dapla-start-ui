import { WIZARD } from './WIZARD'

export const STEP_2 = {
  TEXT: <>
    <p>
      Her angir du teamets medlemmer. Teamet er delt i fire grupper som innehar forskjellige
      tilgangsnivåer. Tabellen under viser hvilke grupper som har hvilke tilganger.
    </p>
    <p>
      Et medlem kan ha flere roller, som kan reflektere medlemmets flere funksjoner i et team. Men ingen roller med
      lavere tilganger har tilganger som en rolle med høyere tilganger ikke også har.
    </p>
    <p>
      Færrest mulig personer i teamet burde være <b>{WIZARD.DATA_ADMINS.title}</b> ettersom denne rollen
      gir tilgang til upseudonymiserte data (maks 3 stk).
    </p>
  </>,
  HELP_HEADER: 'Hvordan bør jeg sette opp teamet egentlig?',
  HELP: <p style={{ fontSize: '0.85rem', marginBottom: '2rem' }}>
    <b>Det som fylles inn her kan endres senere. </b>
    I boksene under kan du søke på navn og epost. Fra listen som dukker opp under boksen kan du velge person eller bruke
    piltastene og trykke Enter. Hvis en person ikke finnes i søket kan du legge inn kommentar i siste
    boksen '<b>{WIZARD.OTHER_INFO.title}</b>' om dette og i hvilken gruppe den skal inn.
  </p>,
  GROUPS: [
    {
      group: WIZARD.MANAGER.title,
      cloudSync: false,
      sensitiveData: false,
      indata: false,
      outdata: false
    },
    {
      group: WIZARD.DATA_ADMINS.title,
      cloudSync: true,
      sensitiveData: true,
      indata: true,
      outdata: true
    },
    {
      group: WIZARD.DEVELOPERS.title,
      cloudSync: false,
      sensitiveData: false,
      indata: true,
      outdata: true
    }
  ],
  ACCESS_LEVELS: {
    cloudSync: 'Administrere bakke-sky synkronisering',
    sensitiveData: 'Kildedata (upseudonymisert)',
    indata: 'Produktdata',
    outdata: 'Delte data'
  },
  FORM_FIELDS: ['DATA_ADMINS', 'DEVELOPERS']
}
