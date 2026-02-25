import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { QuizResult } from '@/app/components/QuizResult';

export interface Question {
  id: number;
  question: string;
  options: { text: string }[];
}

export interface Profile {
  id: string;               // ex.: 'forasteiro'
  name: string;             // ex.: 'Independente'
  description: string;
  characteristics: string[];
  color: string;
  image: string;
  populationPct: number;    // % da população (do PPT)
}

/**
 * Perfis oficiais (8) de acordo com o PPT + mapeamentos solicitados.
 * IDs padronizados conforme você pediu.
 */
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

/**
 * Perguntas oficiais (5) – o resultado é calculado APENAS a partir de P1 e P4.
 */
const questions: Question[] = [
  {
    id: 1,
    question: 'Vamos falar sobre o seu trabalho. O quanto ele é importante para você?',
    options: [
      { text: 'Meu trabalho não é tão importante, quero ter tempo livre para fazer o que realmente importa para mim.' }, // 1
      { text: 'Meu trabalho é importante, mas não como o resto da minha vida.' },                                        // 2
      { text: 'Meu trabalho é tão importante como o resto da minha vida.' },                                            // 3
      { text: 'Meu trabalho é centro da minha vida.' },                                                                  // 4
    ],
  },
  {
    id: 2,
    question: 'O quanto você diria que é emocionalmente conectado com a sua empresa?',
    options: [
      { text: 'Eu não gosto do lugar onde trabalho e nem recomendo.' },
      { text: 'Eu sou indiferente e não me preocupo em recomendar.' },
      { text: 'Eu gosto e acho um bom lugar para trabalhar.' },
      { text: 'Eu amo minha empresa e recomendo para amigos e familiares.' },
    ],
  },
  {
    id: 3,
    question: 'Qual dos seguintes fatores faria com que você melhorasse o engajamento emocional com a sua empresa?',
    options: [
      { text: 'Melhores salários.' },
      { text: 'Reconhecimento financeiro.' },
      { text: 'Benefícios que atendem a minha necessidade.' },
      { text: 'Bom equilíbrio entre vida e trabalho.' },
    ],
  },
  {
    id: 4,
    question: 'O quanto você diria que é envolvido com a comunidade ou com trabalhos voluntários?',
    options: [
      { text: 'Não sou nada envolvido.' },       // 1
      { text: 'Não sou, mas gostaria de ser.' }, // 2
      { text: 'Sim, quando eu posso.' },         // 3
      { text: 'Sim, sou ativamente envolvido.' } // 4
    ],
  },
  {
    id: 5,
    question: 'O quanto a sua empresa te incentiva a ser engajado com a comunidade?',
    options: [
      { text: 'Nada, e tudo bem.' },
      { text: 'Nada, e eu gostaria que ela me incentivasse.' },
      { text: 'Um pouco, mas poderia fazer mais.' },
      { text: 'Sim, incentiva muito.' },
    ],
  },
];

/**
 * Dada a resposta de P1 e P4 (1..4), devolve o ID do perfil conforme gabarito do PPT.
 */
function mapProfileFromP1P4(p1: number, p4: number): Profile['id'] {
  if (p1 === 1 && (p4 === 1 || p4 === 2)) return 'forasteiro';     // Independente (18%)
  if (p1 === 2 && (p4 === 1 || p4 === 2)) return 'guardiao';       // Intencionais (23%)
  if (p1 === 2 && (p4 === 3 || p4 === 4)) return 'funcional';      // Objetivos (11%)
  if (p1 === 1 && (p4 === 3 || p4 === 4)) return 'coletivista';    // Comunitários (5%)
  if (p1 === 4 && (p4 === 1 || p4 === 2)) return 'workaholic';     // Workaholic (10%)
  if (p1 === 3 && (p4 === 1 || p4 === 2)) return 'envolvido';      // Conectados (9%)
  if (p1 === 3 && (p4 === 3 || p4 === 4)) return 'normativista';   // Estáveis (17%)
  if (p1 === 4 && (p4 === 3 || p4 === 4)) return 'engajado';       // Multiengajados (7%)
  // fallback defensivo (não deve ocorrer com valores válidos)
  return 'forasteiro';
}

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);     // guarda índices 0..3
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finalProfileId, setFinalProfileId] = useState<Profile['id'] | null>(null);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      setSelectedOption(newAnswers[nextIndex] ?? null);
    } else {
      // Finalizou: calcula resultado apenas com P1 e P4
      const p1 = (newAnswers[0] ?? 0) + 1; // transforma 0..3 -> 1..4
      const p4 = (newAnswers[3] ?? 0) + 1;
      const profileId = mapProfileFromP1P4(p1, p4);
      setFinalProfileId(profileId);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;
    const prevIndex = currentQuestion - 1;
    setCurrentQuestion(prevIndex);
    setSelectedOption(answers[prevIndex] ?? null);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setFinalProfileId(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Tela de Resultado
  if (finalProfileId) {
    return <QuizResult profileId={finalProfileId} onRestart={handleRestart} />;
  }

  // Tela de Perguntas
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Quiz de Perfil Profissional</h1>
          <p className="text-muted-foreground">
            Pergunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="mb-6">{questions[currentQuestion].question}</h2>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === index
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="size-5" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              selectedOption === null
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
