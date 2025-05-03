export interface Job {
  id: string;
  title: string;
  location: string;
  country: 'Sverige' | 'Norge';
  period: string;
  salary: string;
  department: string;
  description: string;
  requirements: string[];
  contactPerson: string;
  contactEmail: string;
  applyUrl: string;
  deadline: string;
  weekFrom?: number;
  weekTo?: number;
  extraSalary?: 'ja' | 'nej';
  timlon?: number;
}

export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Sommarvikarierande läkarassistent',
    location: 'Stockholm',
    country: 'Sverige',
    weekFrom: 25,
    weekTo: 32,
    period: 'Juni - Augusti 2024',
    salary: '28000 SEK/månad',
    department: 'Medicinkliniken, Karolinska Universitetssjukhuset',
    description: 'Som läkarassistent kommer du att arbeta nära överläkare med journalhantering, enklare undersökningar och administrativa uppgifter. Perfekt för dig som studerar till läkare och vill få värdefull erfarenhet.',
    requirements: ['Minst termin 6 på läkarprogrammet', 'Goda kunskaper i svenska', 'Teamspelare med god kommunikationsförmåga'],
    contactPerson: 'Maria Andersson',
    contactEmail: 'maria.andersson@karolinska.se',
    applyUrl: 'https://karolinska.se/jobb/1234',
    deadline: '2024-04-30',
    timlon: 175,
    extraSalary: 'ja',
  },
  {
    id: '2',
    title: 'Sommarvikarie Vårdcentral',
    location: 'Göteborg',
    country: 'Sverige',
    weekFrom: 24,
    weekTo: 31,
    period: 'Juni - Augusti 2024',
    salary: '26000 SEK/månad',
    department: 'Sahlgrenska Vårdcentral',
    description: 'Vi söker läkarstudenter som vill arbeta som läkarassistenter under sommaren. Du kommer att delta i det dagliga arbetet på vårdcentralen med patientmöten, provtagning och administrativa uppgifter.',
    requirements: ['Minst termin 8 på läkarprogrammet', 'God samarbetsförmåga', 'Strukturerad och noggrann'],
    contactPerson: 'Johan Bergström',
    contactEmail: 'johan.bergstrom@sahlgrenska.se',
    applyUrl: 'https://sahlgrenska.se/sommarjobb',
    deadline: '2024-05-15',
    timlon: 163,
    extraSalary: 'ja',
  },
  {
    id: '3',
    title: 'Sommarvikarierande läkarassistent',
    location: 'Oslo',
    country: 'Norge',
    weekFrom: 26,
    weekTo: 33,
    period: 'Juni - Augusti 2024',
    salary: '32 000 NOK/månad',
    department: 'Akutmedicin, Oslo Universitetssjukhus',
    description: 'Vi söker efter läkarstudenter som vill jobba som läkarassistenter på akutmottagningen i sommar. Du kommer att få värdefull erfarenhet inom akutmedicin och arbeta nära erfarna läkare.',
    requirements: ['Minst 3 års läkarstudier', 'Grundläggande kunskaper i norska', 'Intresse för akutmedicin'],
    contactPerson: 'Erik Hansen',
    contactEmail: 'erik.hansen@ous-hf.no',
    applyUrl: 'https://oslo-universitetssykehus.no/jobb/3456',
    deadline: '2024-04-15',
    timlon: 200,
    extraSalary: 'ja',
  },
  {
    id: '4',
    title: 'Sommarjobb Psykiatri',
    location: 'Malmö',
    country: 'Sverige',
    weekFrom: 27,
    weekTo: 34,
    period: 'Juli - Augusti 2024',
    salary: '27000 SEK/månad',
    department: 'Psykiatriska kliniken, Skånes Universitetssjukhus',
    description: 'Vi söker läkarstudenter med intresse för psykiatri som vill arbeta hos oss under sommaren. Arbetet innebär dokumentation, deltagande i ronder och patientsamtal under handledning.',
    requirements: ['Minst termin 7 på läkarprogrammet', 'Intresse för psykiatri', 'Empatisk förmåga'],
    contactPerson: 'Anna Lindberg',
    contactEmail: 'anna.lindberg@skane.se',
    applyUrl: 'https://skane.se/ledigajobb/5678',
    deadline: '2024-05-01',
  },
  {
    id: '5',
    title: 'Sommarvikarierande barnavdelning',
    location: 'Bergen',
    country: 'Norge',
    weekFrom: 23,
    weekTo: 29,
    period: 'Juni - Juli 2024',
    salary: '30 000 NOK/månad',
    department: 'Barnavdelningen, Haukeland Universitetssjukhus',
    description: 'Vi söker läkarstudenter som önskar jobba på barnavdelningen i sommar. Du kommer att få erfarenhet inom pediatrisk medicin och delta i det dagliga arbetet på avdelningen.',
    requirements: ['Minst 4 års läkarstudier', 'Grundläggande kunskaper i norska', 'Intresse för pediatrik'],
    contactPerson: 'Kari Olsen',
    contactEmail: 'kari.olsen@helse-bergen.no',
    applyUrl: 'https://helse-bergen.no/jobb/9012',
    deadline: '2024-04-20',
  },
  {
    id: '6',
    title: 'Sommarvikarierande barnläkare',
    location: 'Stavanger',
    country: 'Norge',
    weekFrom: 28,
    weekTo: 35,
    period: 'Juni - Augusti 2024',
    salary: '48 000 NOK/månad',
    department: 'Barnkliniken, Stavanger Universitetssjukhus',
    description: 'Vi söker läkarstudenter i slutet av sin utbildning som vill arbeta med pediatrik under sommaren. Du kommer att få värdefull erfarenhet inom barnmedicin och arbeta i ett multidisciplinärt team.',
    requirements: ['Minst 5 års läkarstudier', 'Grundläggande kunskaper i norska', 'Intresse för pediatrik', 'Tidigare erfarenhet av barnsjukvård är meriterande'],
    contactPerson: 'Lars Nilsson',
    contactEmail: 'lars.nilsson@sus.no',
    applyUrl: 'https://sus.no/karriar/7890',
    deadline: '2024-05-15',
  },
]; 