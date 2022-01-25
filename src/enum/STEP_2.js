import { WIZARD } from './WIZARD'

export const STEP_2 = {
  TEXT: <p>
    Her får du muligheten til å fylle teamet med medlemmer. Teamet er delt i fire roller som innehar forskjellige
    tilgangsnivåer. Tabellen under forsøker å gi en oversikt over hvilke roller som gir hvilke tilganger. Medlemmer i
    teamet angis innenfor de forskjellige områdene med vanlig kortform av SSB epost.
    <b> Det som fylles inn her kan endres senere.</b>
  </p>,
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
