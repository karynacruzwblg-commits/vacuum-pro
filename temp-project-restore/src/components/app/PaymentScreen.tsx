"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Lock, Sparkles } from "lucide-react";

interface PaymentScreenProps {
  onComplete: () => void;
}

export function PaymentScreen({ onComplete }: PaymentScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#2A2A2A] p-6">
      <div className="max-w-2xl mx-auto pt-12 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#62D8C9] to-[#3A4F66] shadow-lg mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Desbloqueie Sua Transformação
          </h1>
          <p className="text-[#62D8C9]">
            Acesso completo ao programa personalizado
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-[#3A4F66] rounded-3xl shadow-xl overflow-hidden mb-6 border border-[#62D8C9]/20">
          {/* Price Header */}
          <div className="bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] p-8 text-white text-center">
            <p className="text-sm opacity-90 mb-2">Investimento Único</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-bold">R$ 9,99</span>
            </div>
            <p className="text-sm opacity-90 mt-2">Pagamento único - Acesso vitalício</p>
          </div>

          {/* Features */}
          <div className="p-8 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Programa Completo de 4 Semanas</p>
                <p className="text-sm text-[#62D8C9]/80">28 dias de exercícios personalizados</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Vídeos Guiados em HD</p>
                <p className="text-sm text-[#62D8C9]/80">Instruções passo a passo</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Sistema de Gamificação</p>
                <p className="text-sm text-[#62D8C9]/80">Pontos, desafios e conquistas</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Acompanhamento de Progresso</p>
                <p className="text-sm text-[#62D8C9]/80">Fotos antes/depois e estatísticas</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Lembretes Diários</p>
                <p className="text-sm text-[#62D8C9]/80">Nunca perca um treino</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Acesso Vitalício</p>
                <p className="text-sm text-[#62D8C9]/80">Repita o programa quantas vezes quiser</p>
              </div>
            </div>
          </div>

          {/* Bonus */}
          <div className="px-8 pb-8">
            <div className="bg-gradient-to-r from-[#62D8C9]/10 to-[#3A4F66]/10 border-2 border-[#62D8C9]/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#62D8C9]" />
                <h3 className="font-bold text-white">Bônus Exclusivo</h3>
              </div>
              <p className="text-sm text-[#62D8C9]/80 mb-3">
                Upgrade disponível: Receitas anti-inflamação para secar o estômago alto
              </p>
              <p className="text-xs text-[#62D8C9]/60">
                Desbloqueie depois por apenas R$ 19,90
              </p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="space-y-4">
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-14 text-lg bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] hover:from-[#5BC5B7] hover:to-[#2E4155] text-white shadow-lg"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processando...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Desbloquear Agora
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-[#62D8C9]">
            <Lock className="w-4 h-4" />
            <span>Pagamento 100% seguro e criptografado</span>
          </div>

          <p className="text-center text-xs text-[#62D8C9]/60">
            Ao continuar, você concorda com nossos termos de uso e política de privacidade
          </p>
        </div>

        {/* Testimonial */}
        <div className="mt-8 bg-[#3A4F66]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#62D8C9]/20">
          <p className="text-sm text-white italic mb-3">
            "Em 4 semanas consegui reduzir 3cm da cintura e finalmente sinto meu core forte novamente. Melhor investimento que fiz em mim!"
          </p>
          <p className="text-xs text-[#62D8C9] font-semibold">
            — Marina, 34 anos, mãe de 2
          </p>
        </div>
      </div>
    </div>
  );
}
