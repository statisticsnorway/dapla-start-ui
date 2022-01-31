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
  </>,
  HELP_HEADER: 'Hvordan bør jeg sette opp teamet egentlig?',
  HELP: <p style={{ fontSize: '0.85rem', marginBottom: '2rem' }}><b> Det som fylles inn her kan endres senere.</b></p>,
  GROUPS: [
    {
      group: WIZARD.MANAGER.title,
      fullAccess: true,
      sensitiveData: true,
      cloudSync: true,
      indata: true,
      outdata: true
    },
    {
      group: WIZARD.DATA_PROTECTION_OFFICERS.title,
      fullAccess: false,
      sensitiveData: true,
      cloudSync: true,
      indata: true,
      outdata: true
    },
    {
      group: WIZARD.DEVELOPERS.title,
      fullAccess: false,
      sensitiveData: false,
      cloudSync: false,
      indata: true,
      outdata: true
    },
    {
      group: WIZARD.CONSUMERS.title,
      fullAccess: false,
      sensitiveData: false,
      cloudSync: false,
      indata: false,
      outdata: true
    }
  ],
  ACCESS_LEVELS: {
    fullAccess: 'Full kontroll',
    sensitiveData: 'Kildedata (upseudonymisert)',
    cloudSync: 'Administrere bakke-sky synkronisering',
    indata: 'Inndata',
    outdata: 'Utdata'
  },
  FORM_FIELDS: ['DATA_PROTECTION_OFFICERS', 'DEVELOPERS', 'CONSUMERS']
}
