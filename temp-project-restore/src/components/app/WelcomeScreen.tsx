"use client";

import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Target } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#62D8C9] to-[#3A4F66] shadow-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Silhueta minimalista do tronco com linha do abdômen retraída */}
              <rect x="6" y="4" width="12" height="16" rx="2" fill="currentColor" />
              <path d="M12 4v16" stroke="currentColor" strokeWidth="1" />
              <path d="M10 8h4" stroke="currentColor" strokeWidth="0.5" />
              <path d="M11 12h2" stroke="currentColor" strokeWidth="0.3" />
              <path d="M10 16h4" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#2A2A2A]">
            Vacuum Pro
          </h1>
          <p className="text-lg text-[#3A4F66]">
            Acabe de vez com o desconforto abdominal. Fortaleça sua confiança
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 pt-8">
          <div className="flex items-start gap-4 text-left bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-[#62D8C9]/30 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-[#62D8C9]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#2A2A2A]">Programa Personalizado</h3>
              <p className="text-sm text-[#3A4F66]">
                Exercícios adaptados ao seu nível e necessidades
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-[#62D8C9]/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#62D8C9]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#2A2A2A]">Resultados Reais</h3>
              <p className="text-sm text-[#3A4F66]">
                Diga adeus ao desconforto e recupere sua autoestima.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-[#62D8C9]/30 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-[#62D8C9]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#2A2A2A]">Apenas 5-10 min/dia</h3>
              <p className="text-sm text-[#3A4F66]">
                Exercícios rápidos que cabem na sua rotina
              </p>
            </div>
          </div>
        </div>

        {/* Prova Social */}
        <div className="bg-[#FF8A7A]/10 border border-[#FF8A7A]/20 rounded-2xl p-6">
          <p className="text-sm text-[#2A2A2A] leading-relaxed">
            90% das mulheres relatam sentir mais firmeza e confiança nas primeiras semanas. Você já tentou de tudo — agora é hora de fazer o que realmente funciona.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-8 space-y-4">
          <Button
            onClick={onStart}
            className="w-full h-14 text-lg bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] hover:from-[#5BC5B7] hover:to-[#2E4155] text-white shadow-lg"
          >
            Começar Minha Transformação
          </Button>
          <p className="text-xs text-[#3A4F66]">
            Junte-se a milhares de mulheres que já transformaram seu core
          </p>
        </div>
      </div>
    </div>
  );
}