"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionnaireScreenProps {
  onComplete: (answers: Record<number, number>) => void;
}

const questions = [
  {
    id: 1,
    question: "Como você descreveria a sensação na região do seu abdômen?",
    options: [
      { text: "Firme e tonificado", value: 0 },
      { text: "Um pouco solto, mas não me incomoda muito", value: 1 },
      { text: "Solto e estufado, mesmo quando não comi muito", value: 2 },
      { text: "Muito solto, como se não tivesse controle", value: 3 },
    ],
  },
  {
    id: 2,
    question: "Você sente que seu estômago fica 'alto' ou projetado para frente?",
    options: [
      { text: "Não, meu abdômen é plano", value: 0 },
      { text: "Às vezes, principalmente após as refeições", value: 1 },
      { text: "Sim, frequentemente parece inchado", value: 2 },
      { text: "Sempre, independente do que eu coma", value: 3 },
    ],
  },
  {
    id: 3,
    question: "Você já teve gestação ou passou por cirurgia abdominal?",
    options: [
      { text: "Não", value: 0 },
      { text: "Sim, há mais de 5 anos", value: 1 },
      { text: "Sim, entre 1 e 5 anos atrás", value: 2 },
      { text: "Sim, recentemente (menos de 1 ano)", value: 3 },
    ],
  },
  {
    id: 4,
    question: "Como está sua postura no dia a dia?",
    options: [
      { text: "Excelente, sempre mantenho as costas retas", value: 0 },
      { text: "Boa, mas às vezes me pego curvada", value: 1 },
      { text: "Ruim, frequentemente sinto dores nas costas", value: 2 },
      { text: "Péssima, tenho dor constante e dificuldade para manter ereta", value: 3 },
    ],
  },
  {
    id: 5,
    question: "Você sente dor ou desconforto na região lombar?",
    options: [
      { text: "Nunca", value: 0 },
      { text: "Raramente, apenas após esforço físico", value: 1 },
      { text: "Frequentemente, principalmente ao final do dia", value: 2 },
      { text: "Constantemente, afeta minha qualidade de vida", value: 3 },
    ],
  },
  {
    id: 6,
    question: "Quando você tenta contrair o abdômen, o que acontece?",
    options: [
      { text: "Consigo contrair facilmente e sentir os músculos", value: 0 },
      { text: "Consigo contrair, mas não sinto muita força", value: 1 },
      { text: "Tenho dificuldade para contrair", value: 2 },
      { text: "Não consigo contrair ou não sinto nada", value: 3 },
    ],
  },
  {
    id: 7,
    question: "Você já tentou dietas, jejuns ou exercícios abdominais tradicionais?",
    options: [
      { text: "Não tentei ainda", value: 0 },
      { text: "Sim, e funcionou bem", value: 1 },
      { text: "Sim, mas os resultados foram temporários", value: 2 },
      { text: "Sim, várias vezes, mas nada funcionou na barriga", value: 3 },
    ],
  },
  {
    id: 8,
    question: "Como você descreveria sua rotina diária?",
    options: [
      { text: "Tranquila, tenho tempo para me cuidar", value: 0 },
      { text: "Moderada, consigo encaixar algumas atividades", value: 1 },
      { text: "Corrida, tenho pouco tempo livre", value: 2 },
      { text: "Extremamente corrida, mal tenho tempo para mim", value: 3 },
    ],
  },
  {
    id: 9,
    question: "Ao olhar no espelho, como você se sente em relação ao seu abdômen?",
    options: [
      { text: "Satisfeita e confiante", value: 0 },
      { text: "Poderia melhorar, mas não me incomoda muito", value: 1 },
      { text: "Insatisfeita, gostaria de mudanças", value: 2 },
      { text: "Muito frustrada, afeta minha autoestima", value: 3 },
    ],
  },
  {
    id: 10,
    question: "Você sente que, não importa o que faça, a barriga não diminui?",
    options: [
      { text: "Não, consigo resultados quando me esforço", value: 0 },
      { text: "Às vezes tenho essa sensação", value: 1 },
      { text: "Sim, frequentemente me sinto assim", value: 2 },
      { text: "Sempre, já perdi a esperança", value: 3 },
    ],
  },
  {
    id: 11,
    question: "Você tem sensação de 'separação' ou 'buraco' no meio do abdômen?",
    options: [
      { text: "Não, meu abdômen parece uniforme", value: 0 },
      { text: "Às vezes sinto algo diferente ao tocar", value: 1 },
      { text: "Sim, sinto uma separação clara", value: 2 },
      { text: "Sim, muito evidente, consigo colocar dedos no espaço", value: 3 },
    ],
  },
  {
    id: 12,
    question: "Como você avaliaria seu nível de energia no dia a dia?",
    options: [
      { text: "Alto, me sinto disposta", value: 0 },
      { text: "Moderado, tenho energia para o essencial", value: 1 },
      { text: "Baixo, frequentemente me sinto cansada", value: 2 },
      { text: "Muito baixo, exausta constantemente", value: 3 },
    ],
  },
];

export function QuestionnaireScreen({ onComplete }: QuestionnaireScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswer = answers[questions[currentQuestion].id] !== undefined;

  const handleAnswer = (value: number) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value,
    };
    setAnswers(newAnswers);

    // Auto-advance after selection
    setTimeout(() => {
      if (isLastQuestion) {
        onComplete(newAnswers);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6">
      <div className="max-w-2xl mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="text-[#3A4F66]"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <span className="text-sm text-[#3A4F66]">
              {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] leading-tight">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-200 ${
                  answers[questions[currentQuestion].id] === option.value
                    ? "border-[#62D8C9] bg-[#62D8C9]/10 shadow-md"
                    : "border-[#E0E0E0] bg-white hover:border-[#62D8C9]/50 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers[questions[currentQuestion].id] === option.value
                        ? "border-[#62D8C9] bg-[#62D8C9]"
                        : "border-[#62D8C9]/30"
                    }`}
                  >
                    {answers[questions[currentQuestion].id] === option.value && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-[#2A2A2A] font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Prova Social */}
        {isLastQuestion && (
          <div className="mt-8 bg-[#FF8A7A]/10 border border-[#FF8A7A]/20 rounded-2xl p-6">
            <p className="text-sm text-[#2A2A2A] leading-relaxed">
              +10 mil mulheres cansadas de se sentir inseguras deram o primeiro passo por aqui. Você já imaginou como estaria hoje se tivesse começado antes? Comece agora.
            </p>
          </div>
        )}

        {/* Motivational message */}
        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
          <p className="text-sm text-[#3A4F66] text-center">
            💝 Cada resposta nos ajuda a criar o programa perfeito para você
          </p>
        </div>
      </div>
    </div>
  );
}