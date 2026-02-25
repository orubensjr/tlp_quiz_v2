// src/app/components/profiles.ts

export type ProfileId =
  | 'forasteiro'    // Independente
  | 'guardiao'      // Intencionais
  | 'funcional'     // Objetivos
  | 'coletivista'   // Comunitários
  | 'workaholic'    // Workaholic
  | 'envolvido'     // Conectados
  | 'normativista'  // Estáveis
  | 'engajado';     // Multiengajados

export interface Profile {
  id: ProfileId;
  name: string;
  description: string;
  characteristics: string[];
  color: string;
  image: string;
  populationPct: number; // % da população (segundo o PPT)
}

export const profiles: Profile[] = [
  {
    id: 'forasteiro', // Independente
    name: 'Independente',
    description:
      'Você valoriza autonomia e tempo para o que realmente importa. Mantém limites claros entre vida pessoal e trabalho.',
    characteristics: [
      'Representa 18% da população',
      'Autonomia e liberdade são essenciais',
      'Busca previsibilidade e clareza de expectativas',
      'Trabalho não é o centro da sua vida',
    ],
    color: '#00EB5E',
    image:
      'https://images.unsplash.com/photo-1758518727592-706e80ebc354?auto=format&fit=crop&w=1280&q=80',
    populationPct: 18,
  },
  {
    id: 'guardiao', // Intencionais
    name: 'Intencionais',
    description:
      'Você equilibra o trabalho com outros aspectos da vida, com escolhas conscientes e foco no que faz sentido.',
    characteristics: [
      'Representa 23% da população',
      'Decisões ponderadas e consistentes',
      'Busca propósito, mas sem abrir mão do equilíbrio',
      'Foco em resultados sustentáveis',
    ],
    color: '#3B82F6',
    image:
      'https://images.unsplash.com/photo-1758691736498-422201cc57da?auto=format&fit=crop&w=1280&q=80',
    populationPct: 23,
  },
  {
    id: 'funcional', // Objetivos
    name: 'Objetivos',
    description:
      'Você se engaja por metas claras e avanço profissional, mantendo critérios e métricas bem definidos.',
    characteristics: [
      'Representa 11% da população',
      'Foco em objetivos e progressão',
      'Valoriza meritocracia e reconhecimento por entrega',
      'Clareza de papéis e indicadores',
    ],
    color: '#10B981',
    image:
      'https://images.unsplash.com/photo-1758874384552-5d090a98033b?auto=format&fit=crop&w=1280&q=80',
    populationPct: 11,
  },
  {
    id: 'coletivista', // Comunitários
    name: 'Comunitários',
    description:
      'Você se envolve com o impacto social e com a comunidade, valorizando conexões e colaboração.',
    characteristics: [
      'Representa 5% da população',
      'Alto senso de pertencimento',
      'Engajamento em ações coletivas/voluntárias',
      'Cooperação e empatia no dia a dia',
    ],
    color: '#F59E0B',
    image:
      'https://images.unsplash.com/photo-1739298061707-cefee19941b7?auto=format&fit=crop&w=1280&q=80',
    populationPct: 5,
  },
  {
    id: 'workaholic', // Workaholic
    name: 'Workaholic',
    description:
      'Trabalho no centro das suas decisões. Alta dedicação e intensidade nas entregas.',
    characteristics: [
      'Representa 10% da população',
      'Alta disciplina e produtividade',
      'Priorização do trabalho no cotidiano',
      'Busca constante por resultados',
    ],
    color: '#EF4444',
    image:
      'https://images.unsplash.com/photo-1761250246894-ee2314939662?auto=format&fit=crop&w=1280&q=80',
    populationPct: 10,
  },
  {
    id: 'envolvido', // Conectados
    name: 'Conectados',
    description:
      'Você equilibra vida e trabalho, com envolvimento consistente e bom relacionamento com a empresa.',
    characteristics: [
      'Representa 9% da população',
      'Relacionamento saudável com a empresa',
      'Equilíbrio vida-trabalho',
      'Compromisso com entregas e times',
    ],
    color: '#06B6D4',
    image:
      'https://images.unsplash.com/photo-1760037028485-d00dd2b8f6f0?auto=format&fit=crop&w=1280&q=80',
    populationPct: 9,
  },
  {
    id: 'normativista', // Estáveis
    name: 'Estáveis',
    description:
      'Você busca consistência, previsibilidade e um ambiente que incentive relações duradouras.',
    characteristics: [
      'Representa 17% da população',
      'Rotina e processos claros',
      'Vínculo de confiança com a empresa',
      'Engajamento constante e seguro',
    ],
    color: '#6366F1',
    image:
      'https://images.unsplash.com/photo-1758873272562-aa5459cbf34b?auto=format&fit=crop&w=1280&q=80',
    populationPct: 17,
  },
  {
    id: 'engajado', // Multiengajados
    name: 'Multiengajados',
    description:
      'Alto envolvimento tanto com trabalho quanto com comunidade. Energia e protagonismo em várias frentes.',
    characteristics: [
      'Representa 7% da população',
      'Alto engajamento em múltiplos temas',
      'Colaboração, impacto e entrega',
      'Conexão forte com propósito',
    ],
    color: '#8B5CF6',
    image:
      'https://images.unsplash.com/photo-1709803312782-0c3b175875ed?auto=format&fit=crop&w=1280&q=80',
    populationPct: 7,
  },
];

export function getProfileById(id: ProfileId): Profile | undefined {
  return profiles.find((p) => p.id === id);
}
