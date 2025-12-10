"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/app/page";
import { X, Camera, Upload, Image as ImageIcon } from "lucide-react";

interface ProgressPhotosModalProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onClose: () => void;
}

export function ProgressPhotosModal({ userProfile, onUpdateProfile, onClose }: ProgressPhotosModalProps) {
  const [beforePreview, setBeforePreview] = useState<string | null>(userProfile.beforePhoto || null);
  const [afterPreview, setAfterPreview] = useState<string | null>(userProfile.afterPhoto || null);

  const handleFileChange = (type: "before" | "after", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "before") {
          setBeforePreview(result);
          onUpdateProfile({ beforePhoto: result });
        } else {
          setAfterPreview(result);
          onUpdateProfile({ afterPhoto: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E0E0E0] p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2A2A2A]">Fotos de Progresso</h2>
            <p className="text-sm text-[#3A4F66]">Registre sua transformação</p>
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
          {/* Info */}
          <div className="bg-[#FFF9F0] border-l-4 border-[#FF8A7A] p-4 rounded-r-xl">
            <p className="text-sm text-[#3A4F66]">
              📸 <strong>Dica:</strong> Tire fotos no mesmo local, com a mesma iluminação e posição para comparar melhor sua evolução!
            </p>
          </div>

          {/* Before Photo */}
          <div>
            <h3 className="font-bold text-[#2A2A2A] mb-3">Foto Antes</h3>
            <div className="relative">
              {beforePreview ? (
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F8F8F8]">
                  <img
                    src={beforePreview}
                    alt="Foto antes"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setBeforePreview(null);
                      onUpdateProfile({ beforePhoto: undefined });
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5 text-[#3A4F66]" />
                  </button>
                </div>
              ) : (
                <label className="block aspect-[3/4] rounded-2xl border-2 border-dashed border-[#62D8C9]/30 bg-[#F8F8F8] hover:bg-[#F8F8F8] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("before", e)}
                    className="hidden"
                  />
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Camera className="w-12 h-12 text-[#62D8C9] mb-3" />
                    <p className="font-semibold text-[#2A2A2A] mb-1">Adicionar Foto Antes</p>
                    <p className="text-sm text-[#3A4F66]">Clique para tirar ou escolher foto</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* After Photo */}
          <div>
            <h3 className="font-bold text-[#2A2A2A] mb-3">Foto Depois</h3>
            <div className="relative">
              {afterPreview ? (
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F8F8F8]">
                  <img
                    src={afterPreview}
                    alt="Foto depois"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setAfterPreview(null);
                      onUpdateProfile({ afterPhoto: undefined });
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5 text-[#3A4F66]" />
                  </button>
                </div>
              ) : (
                <label className="block aspect-[3/4] rounded-2xl border-2 border-dashed border-[#62D8C9]/30 bg-[#F8F8F8] hover:bg-[#F8F8F8] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("after", e)}
                    className="hidden"
                  />
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Camera className="w-12 h-12 text-[#62D8C9] mb-3" />
                    <p className="font-semibold text-[#2A2A2A] mb-1">Adicionar Foto Depois</p>
                    <p className="text-sm text-[#3A4F66]">Clique para tirar ou escolher foto</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Comparison */}
          {beforePreview && afterPreview && (
            <div className="bg-gradient-to-r from-[#A8D5BA]/20 to-[#7FB69E]/20 rounded-2xl p-6 text-center">
              <ImageIcon className="w-12 h-12 text-[#7FB69E] mx-auto mb-3" />
              <p className="font-bold text-[#2A2A2A] mb-1">Comparação Salva!</p>
              <p className="text-sm text-[#3A4F66]">
                Continue sua jornada e veja sua transformação acontecer 🎉
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#2A2A2A]">Dicas para melhores fotos:</h3>
            <ul className="space-y-2 text-sm text-[#3A4F66]">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Use roupas justas ou fitness para ver melhor os resultados</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Tire fotos de frente, lado e costas</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Mantenha a mesma postura em todas as fotos</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Tire fotos semanalmente para acompanhar a evolução</span>
              </li>
            </ul>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full h-12 bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] hover:from-[#5BC5B7] hover:to-[#2E4155] text-white"
          >
            Salvar e Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}