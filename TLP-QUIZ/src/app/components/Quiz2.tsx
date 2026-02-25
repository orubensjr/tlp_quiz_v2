import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { QuizResult } from '@/app/components/QuizResult';

export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    profiles: string[];
  }[];
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  color: string;
  image: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Vamos falar sobre o seu trabalho. O quanto ele é importante para você?​',
       options: [
      { text: 'Meu trabalho não é tão importante, quero ter tempo livre para fazer o que realmente importa para mim.', profiles: ['independente', 'comunitario'] },
      { text: 'Meu trabalho é importante, mas não como o resto da minha vida.', profiles: ['guardiao', 'normativista'] },
      { text: 'Meu trabalho é tão importante como o resto da minha vida.', profiles: ['coletivista', 'engajado'] },
      { text: 'Meu trabalho é centro da minha vida​.', profiles: ['funcional', 'workaholic'] },
    ],
  },
  {
    id: 2,
    question: 'O quanto você diria que é emocionalmente conectado com a sua empresa?',
    options: [
      { text: 'Eu não gosto do lugar onde trabalho e nem recomendo​.' },
      { text: 'Eu sou indiferente e não me preocupo em recomendar​.' },
      { text: 'Eu gosto e acho um bom lugar para trabalhar​.' },
      { text: 'Eu amo minha empresa e recomendo para amigos e familiares​.' },
    ],
  },
  {
    id: 3,
    question: 'Qual dos seguintes fatores faria com que você melhorasse o engajamento emocional com a sua empresa?',
    options: [
      { text: 'Melhores salários​.' },
      { text: 'Reconhecimento financeiro​.' },
      { text: 'Benefícios que atendem a minha necessidade​.' },
      { text: 'Bom equilíbrio entre vida e trabalho​.'},
    ],
  },
  {
    id: 4,
    question: 'O quanto você diria que é envolvido com a comunidade ou com trabalhos voluntários?​',
    options: [
      { text: 'Não sou nada envolvido​.', profiles: ['coletivista', 'normativista'] },
      { text: 'Não sou, mas gostaria de ser​.', profiles: ['coletivista', 'normativista'] },
      { text: 'Sim, quando eu posso.', profiles: ['workaholic', 'engajado'] },
      { text: 'Sim, sou ativamente envolvido.', profiles: ['funcional', 'envolvido'] },
    ],
  },
  {
    id: 5,
    question: 'O quanto a sua empresa te incentiva a ser engajado com a comunidade?​',
    options: [
      { text: 'Nada, e tudo bem​.' },
      { text: 'Nada, e eu gostaria que ela me incentivasse​.' },
      { text: 'Um pouco, mas poderia fazer mais​.' },
      { text: 'Sim, incentiva muito​.' },
    ],
  },
];

export const profiles: Profile[] = [
  {
    id: 'forasteiro',
    name: 'INDEPEDENTE',
    description: 'Você tende a manter certa distância emocional da empresa. Enxerga o trabalho como algo funcional ou temporário, priorizando sua autonomia e possibilidades futuras.',
    characteristics: [
      'Representa 18% dos profissionais',
      'Determina e respeita limites entre vida pessoal e profissional',
      'Previsibilidade no dia-a-dia é fundamental',
      'Clareza sobre expectativas, responsabilidades e critérios é essencial',
    ],
    color: '#00EB5E',
    image: 'https://images.unsplash.com/photo-1758518727592-706e80ebc354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAwNDI1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'guardiao',
    name: 'Guardião do Propósito',
    description: 'Você se engaja quando acredita no impacto do que faz. Valores, coerência e sentido são fatores decisivos para sua motivação.',
    characteristics: [
      'Representa 11% dos profissionais',
      'Baseado em dados e evidências',
      'Pensamento lógico estruturado',
      'Resolve problemas de forma metódica',
    ],
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1758691736498-422201cc57da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDA2MjA0OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'criativo',
    name: 'Criativo',
    description: 'Sua criatividade é seu diferencial, sempre trazendo perspectivas únicas e soluções originais.',
    characteristics: [
      'Pensa fora da caixa',
      'Gera ideias inovadoras',
      'Boa visão estética',
      'Flexível e adaptável',
    ],
    color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1709803312782-0c3b175875ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwd29ya3BsYWNlfGVufDF8fHx8MTc3MDA2MjA0OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'executor',
    name: 'Executor',
    description: 'Você transforma planos em realidade com eficiência, focando em entregas e resultados práticos.',
    characteristics: [
      'Altamente produtivo',
      'Focado em entregas',
      'Organizado e disciplinado',
      'Cumpre prazos consistentemente',
    ],
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1758874384552-5d090a98033b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZlJTIwcHJvZmVzc2lvbmFsJTIwd29ya2luZ3xlbnwxfHx8fDE3NzAwNjIwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'colaborativo',
    name: 'Colaborativo',
    description: 'Você valoriza o trabalho em equipe e consegue criar ambientes harmoniosos e produtivos.',
    characteristics: [
      'Trabalha bem em equipe',
      'Empático e compreensivo',
      'Bom ouvinte',
      'Promove cooperação',
    ],
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzAwNTMwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'inovador',
    name: 'Inovador',
    description: 'Você está sempre em busca de novas tecnologias e metodologias para melhorar processos.',
    characteristics: [
      'Visão de futuro',
      'Abraça mudanças',
      'Experimenta novas abordagens',
      'Questiona o status quo',
    ],
    color: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1760037028485-d00dd2b8f6f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAwNjIwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'estrategico',
    name: 'Estratégico',
    description: 'Você tem visão de longo prazo e consegue planejar com precisão para alcançar objetivos complexos.',
    characteristics: [
      'Visão de longo prazo',
      'Planeja com antecedência',
      'Identifica oportunidades',
      'Pensa sistemicamente',
    ],
    color: '#6366F1',
    image: 'https://images.unsplash.com/photo-1758873272562-aa5459cbf34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHBsYW5uaW5nJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcwMDYyMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'comunicador',
    name: 'Comunicador',
    description: 'Sua habilidade de comunicação facilita o entendimento e fortalece relacionamentos profissionais.',
    characteristics: [
      'Comunica-se com clareza',
      'Bom relacionamento interpessoal',
      'Facilita diálogos',
      'Persuasivo e articulado',
    ],
    color: '#EF4444',
    image: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pY2F0aW9uJTIwcHJlc2VudGF0aW9uJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDA2MjA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(newAnswers[currentQuestion + 1] ?? null);
      } else {
        calculateResult(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] ?? null);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    const profileScores: { [key: string]: number } = {};

    finalAnswers.forEach((answerIndex, questionIndex) => {
      const selectedProfiles = questions[questionIndex].options[answerIndex].profiles;
      selectedProfiles.forEach((profile) => {
        profileScores[profile] = (profileScores[profile] || 0) + 1;
      });
    });

    setShowResult(true);
  };

  const getProfileScores = (): { [key: string]: number } => {
    const profileScores: { [key: string]: number } = {};

    answers.forEach((answerIndex, questionIndex) => {
      const selectedProfiles = questions[questionIndex].options[answerIndex].profiles;
      selectedProfiles.forEach((profile) => {
        profileScores[profile] = (profileScores[profile] || 0) + 1;
      });
    });

    return profileScores;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return <QuizResult profileScores={getProfileScores()} onRestart={() => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResult(false);
      setSelectedOption(null);
    }} />;
  }

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
