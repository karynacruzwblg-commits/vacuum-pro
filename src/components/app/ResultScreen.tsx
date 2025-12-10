"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@/app/page";
import { CheckCircle2, Sparkles, Target, TrendingUp } from "lucide-react";
import { useState } from "react";

interface ResultScreenProps {
  userProfile: UserProfile;
  onContinue: (formData: { name: string; email: string; phone: string }) => void;
}

const levelDescriptions = {
  beginner: {
    title: "Diástase Leve",
    description: "Você está no caminho certo! Com exercícios focados, você pode fortalecer seu core rapidamente.",
    color: "from-[#62D8C9] to-[#3A4F66]",
  },
  intermediate: {
    title: "Diástase Moderada",
    description: "Seu core precisa de atenção especial. Com dedicação, você verá resultados transformadores.",
    color: "from-[#FF8A7A] to-[#62D8C9]",
  },
  advanced: {
    title: "Diástase Avançada",
    description: "Seu core precisa de cuidado intensivo. Nosso programa foi feito especialmente para você.",
    color: "from-[#3A4F66] to-[#FF8A7A]",
  },
};

export function ResultScreen({ userProfile, onContinue }: ResultScreenProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({ name: false, email: false, phone: false });

  const levelInfo = levelDescriptions[userProfile.level];

  const handleSubmit = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      phone: !formData.phone.trim(),
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.phone) {
      onContinue(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6">
      <div className="max-w-2xl mx-auto pt-12 pb-20">
        {/* Result Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${levelInfo.color} p-8 text-white text-center`}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Seu Resultado</h2>
            <p className="text-lg opacity-90">Análise Personalizada Completa</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Level Badge */}
            <div className="text-center">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#62D8C9]/20 to-[#3A4F66]/20 rounded-full mb-4">
                <span className="text-2xl font-bold text-[#2A2A2A]">
                  {levelInfo.title}
                </span>
              </div>
              <p className="text-[#3A4F66] text-lg leading-relaxed">
                {levelInfo.description}
              </p>
            </div>

            {/* Program Level */}
            <div className="bg-[#F8F8F8] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#62D8C9] to-[#3A4F66] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2A2A2A]">
                  Programa Nível {userProfile.programLevel}
                </h3>
              </div>
              <p className="text-[#3A4F66]">
                Criado especialmente para suas necessidades, com exercícios progressivos de 5-10 minutos por dia.
              </p>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h3 className="font-bold text-[#2A2A2A] text-lg mb-4">
                O que você vai receber:
              </h3>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2A2A2A]">4 Semanas de Programa</p>
                  <p className="text-sm text-[#3A4F66]">28 dias de exercícios personalizados</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2A2A2A]">Vídeos Guiados</p>
                  <p className="text-sm text-[#3A4F66]">Instruções claras para cada exercício</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2A2A2A]">Checklist Diário</p>
                  <p className="text-sm text-[#3A4F66]">Acompanhe seus hábitos e progresso</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2A2A2A]">Gamificação</p>
                  <p className="text-sm text-[#3A4F66]">Pontos, desafios e conquistas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#62D8C9] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2A2A2A]">Registro de Progresso</p>
                  <p className="text-sm text-[#3A4F66]">Fotos antes/depois e evolução</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#FFF9F0] border-l-4 border-[#FF8A7A] p-4 rounded-r-xl">
              <p className="text-xs text-[#3A4F66]">
                ⚠️ <strong>Importante:</strong> Este resultado é uma sugestão baseada em suas respostas e não substitui diagnóstico médico profissional. Consulte sempre um especialista.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 bg-white rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-[#2A2A2A] text-center">Finalize seu Cadastro</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nome completo *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-[#E0E0E0]'}`}
            />
            <input
              type="email"
              placeholder="E-mail *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-[#E0E0E0]'}`}
            />
            <input
              type="tel"
              placeholder="Número de telefone *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-[#E0E0E0]'}`}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 space-y-4">
          <Button
            onClick={handleSubmit}
            className="w-full h-14 text-lg bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] hover:from-[#5BC5B7] hover:to-[#2E4155] text-white shadow-lg"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Começar Minha Jornada
          </Button>
          
          <p className="text-center text-sm text-[#3A4F66]">
            Investimento único de <strong className="text-[#2A2A2A]">R$ 49,00</strong> para acesso completo
          </p>
        </div>
      </div>
    </div>
  );
}