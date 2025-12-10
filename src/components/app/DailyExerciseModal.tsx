"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, CheckCircle2 } from "lucide-react";

interface DailyExerciseModalProps {
  day: number;
  onClose: () => void;
}

const exercises = [
  {
    id: 1,
    title: "Respiração Diafragmática Básica",
    description: "Aprenda a respirar corretamente usando o diafragma, base de todos os exercícios.",
    duration: "5 min",
    category: "Respiração",
    instructions: [
      "Deite-se confortavelmente de costas",
      "Coloque uma mão no peito e outra na barriga",
      "Inspire pelo nariz, sentindo a barriga subir",
      "Expire pela boca, sentindo a barriga descer",
      "Repita por 5 minutos, mantendo o ritmo"
    ],
    videoPlaceholder: "🫁"
  },
  {
    id: 2,
    title: "Ativação do Transverso",
    description: "Ative o músculo mais profundo do abdômen, essencial para reduzir a diástase.",
    duration: "7 min",
    category: "Ativação",
    instructions: [
      "Deite-se de costas com joelhos dobrados",
      "Inspire profundamente pelo nariz",
      "Ao expirar, puxe o umbigo em direção à coluna",
      "Mantenha por 5 segundos",
      "Relaxe e repita 10 vezes"
    ],
    videoPlaceholder: "💪"
  },
  {
    id: 3,
    title: "Hipopressivo Básico (LPF)",
    description: "Técnica de vácuo abdominal que fortalece o core e reduz a cintura.",
    duration: "8 min",
    category: "Hipopressivo",
    instructions: [
      "Fique em pé com pernas afastadas",
      "Expire todo o ar dos pulmões",
      "Sem respirar, puxe a barriga para dentro e para cima",
      "Mantenha por 10-15 segundos",
      "Inspire suavemente e descanse",
      "Repita 5 vezes"
    ],
    videoPlaceholder: "🌬️"
  },
  {
    id: 4,
    title: "Postura Neutra da Coluna",
    description: "Aprenda a manter a postura correta para proteger a lombar.",
    duration: "6 min",
    category: "Postura",
    instructions: [
      "Fique em pé com pés alinhados aos quadris",
      "Alinhe ombros, quadril e tornozelos",
      "Mantenha o queixo paralelo ao chão",
      "Ative suavemente o core",
      "Pratique essa postura ao longo do dia"
    ],
    videoPlaceholder: "🎯"
  },
  {
    id: 5,
    title: "Alongamento do Core",
    description: "Alongue os músculos abdominais e lombares para maior flexibilidade.",
    duration: "5 min",
    category: "Alongamento",
    instructions: [
      "Deite-se de bruços",
      "Apoie as mãos no chão ao lado do peito",
      "Levante o tronco suavemente",
      "Sinta o alongamento no abdômen",
      "Mantenha por 30 segundos, repita 3 vezes"
    ],
    videoPlaceholder: "🧘‍♀️"
  },
];

export function DailyExerciseModal({ day, onClose }: DailyExerciseModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Select exercise based on day (cycling through exercises)
  const exerciseIndex = ((day - 1) % exercises.length);
  const exercise = exercises[exerciseIndex];

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E0E0E0] p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#3A4F66] font-medium">Dia {day}</span>
            <h2 className="text-xl font-bold text-[#2A2A2A]">{exercise.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center hover:bg-[#F8F8F8] transition-colors"
          >
            <X className="w-5 h-5 text-[#3A4F66]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-[#F8F8F8] to-[#F8F8F8] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">{exercise.videoPlaceholder}</div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-[#62D8C9]" />
                  ) : (
                    <Play className="w-8 h-8 text-[#62D8C9] ml-1" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#2A2A2A]">
                {exercise.category}
              </span>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#2A2A2A]">
                {exercise.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-[#3A4F66] leading-relaxed">
              {exercise.description}
            </p>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-bold text-[#2A2A2A] mb-3">Como fazer:</h3>
            <div className="space-y-3">
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#62D8C9] to-[#3A4F66] flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-[#3A4F66] text-sm pt-0.5">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#FFF9F0] border-l-4 border-[#FF8A7A] p-4 rounded-r-xl">
            <p className="text-sm text-[#3A4F66]">
              💡 <strong>Dica:</strong> Faça os movimentos com calma e atenção. Qualidade é mais importante que quantidade!
            </p>
          </div>

          {/* Complete Button */}
          {completed ? (
            <div className="bg-gradient-to-r from-[#A8D5BA] to-[#7FB69E] rounded-2xl p-6 text-center text-white">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
              <p className="text-xl font-bold">Exercício Concluído!</p>
              <p className="text-sm opacity-90 mt-1">Parabéns! Continue assim 🎉</p>
            </div>
          ) : (
            <Button
              onClick={handleComplete}
              className="w-full h-14 text-lg bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] hover:from-[#5BC5B7] hover:to-[#2E4155] text-white"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Marcar como Concluído
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}