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
    question: 'Quando você pensa no seu trabalho hoje, o que mais define sua relação com ele?',
    scale: [
      { value: 1, profiles
  },
  {
    id: 2,
    question: 'O que mais te motiva no dia a dia profissional?',
    options: [
      { text: 'Ter liberdade para criar meus caminhos e ver meu trabalho sendo reconhecido e conectado ao negócio.', profiles: ['forasteiro', 'envolvido'] },
      { text: 'Ser parte de algo que gera impacto positivo, com estrutura e previsibilidade para apoiar essa entrega.', profiles: ['guardiao', 'normativista'] },
      { text: 'Sentir que faço parte de um grupo unido e crescer junto com a empresa ao longo do caminho.', profiles: ['coletivista', 'engajado'] },
      { text: 'Ter produtividade constante, com clareza do meu papel e estabilidade para entregar bem.', profiles: ['funcional', 'workaholic'] },
    ],
  },
  {
    id: 3,
    question: 'Como você reage a mudanças?',
    options: [
      { text: 'Reajo com certo distanciamento, mas só me sinto confortável quando a mudança vem com regras claras.', profiles: ['forasteiro', 'normativista'] },
      { text: 'Primeiro avalio se faz sentido para os valores da empresa e gosto de discutir os impactos com o time.', profiles: ['guardiao', 'coletivista'] },
      { text: 'Vejo mudanças como oportunidade de entregar mais e até de liderar iniciativas para fazer acontecer.', profiles: ['workaholic', 'envolvido'] },
      { text: 'Me adapto quando está bem explicado e, quando percebo evolução, entro no ritmo com facilidade.', profiles: ['funcional', 'engajado'] },
    ],
  },
  {
    id: 4,
    question: 'Qual frase mais te representa?',
    options: [
      { text: 'Estou aqui enquanto fizer sentido e enquanto o que a empresa defende estiver alinhado com o que acredito.', profiles: ['forasteiro', 'guardiao'] },
      { text: 'Acredito que ninguém faz nada sozinho, e processos bem feitos ajudam todo mundo a funcionar melhor', profiles: ['coletivista', 'normativista'] },
      { text: 'Trabalho duro faz parte de quem eu sou e tenho orgulho de fazer parte do que estamos construindo.', profiles: ['workaholic', 'engajado'] },
      { text: 'Faço bem o meu papel e quero contribuir de verdade, desde que tudo esteja claro para eu entregar o melhor.', profiles: ['funcional', 'envolvido'] },
    ],
  },
  {
    id: 5,
    question: 'Como você se sente em relação à empresa hoje?',
    options: [
      { text: 'Conectado ao que faz sentido para mim e ao ambiente cultural que me impulsiona a seguir em frente.', profiles: ['forasteiro', 'engajado'] },
      { text: 'Conectado ao propósito e às pessoas que compartilham dos mesmos valores.', profiles: ['guardiao', 'coletivista'] },
      { text: 'Conectado ao negócio e às estruturas que sustentam a forma como trabalhamos.', profiles: ['envolvido', 'normativista'] },
      { text: 'Conectado às minhas responsabilidades e dedicado a fazer o trabalho acontecer todos os dias.', profiles: ['funcional', 'workaholic'] },
    ],
  },
  {
    id: 6,
    question: 'O que mais te gera desconforto no trabalho?',
    options: [
      { text: 'Quando não há perspectiva nem clareza sobre funções, prioridades ou o caminho a seguir', profiles: ['forasteiro', 'funcional'] },
      { text: 'Quando percebo incoerência entre discurso e prática ou falta de alinhamento cultural.', profiles: ['guardiao', 'engajado'] },
      { text: 'Quando o clima do time é ruim ou quando minha contribuição não é reconhecida.', profiles: ['coletivista', 'envolvido'] },
      { text: 'Quando sinto que a produtividade trava porque faltam regras claras, processos ou direcionamento.', profiles: ['normativista', 'workaholic'] },
    ],
  },
  {
    id: 7,
    question: 'O que mais te faria permanecer em uma empresa?',
    options: [
      { text: 'Ter oportunidades reais de crescimento, autonomia para construir meu caminho e sentir que contribuo para algo maior.', profiles: ['forasteiro', 'envolvido'] },
      { text: 'Trabalhar em uma empresa com propósito claro e verdadeiro, sustentado por estrutura e organização que tornam tudo coerente.', profiles: ['guardiao', 'normativista'] },
      { text: 'Estar em um time forte e colaborativo, crescendo junto com a empresa e construindo algo relevante.', profiles: ['coletivista', 'engajado'] },
      { text: 'Ter desafios constantes, mas com clareza, segurança e condições para entregar sempre o melhor.', profiles: ['workaholic', 'funcional'] },
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
