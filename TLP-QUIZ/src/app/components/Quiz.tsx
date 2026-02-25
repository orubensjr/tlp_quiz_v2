// src/app/components/Quiz.tsx
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { QuizResult } from './QuizResult';
import type { ProfileId } from './profiles';

export interface Question {
  id: number;
  question: string;
  options: { text: string }[];
}

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
function mapProfileFromP1P4(p1: number, p4: number): ProfileId {
  if (p1 === 1 && (p4 === 1 || p4 === 2)) return 'forasteiro';     // Independente (18%)
  if (p1 === 2 && (p4 === 1 || p4 === 2)) return 'guardiao';       // Intencionais (23%)
  if (p1 === 2 && (p4 === 3 || p4 === 4)) return 'funcional';      // Objetivos (11%)
  if (p1 === 1 && (p4 === 3 || p4 === 4)) return 'coletivista';    // Comunitários (5%)
  if (p1 === 4 && (p4 === 1 || p4 === 2)) return 'workaholic';     // Workaholic (10%)
  if (p1 === 3 && (p4 === 1 || p4 === 2)) return 'envolvido';      // Conectados (9%)
  if (p1 === 3 && (p4 === 3 || p4 === 4)) return 'normativista';   // Estáveis (17%)
  if (p1 === 4 && (p4 === 3 || p4 === 4)) return 'engajado';       // Multiengajados (7%)
  return 'forasteiro'; // fallback defensivo
}

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);     // guarda índices 0..3 por pergunta
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finalProfileId, setFinalProfileId] = useState<ProfileId | null>(null);

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
