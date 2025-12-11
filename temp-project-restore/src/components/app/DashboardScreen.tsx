"use client";

import { useState } from "react";
import { UserProfile } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Calendar, 
  Trophy, 
  User, 
  CheckCircle2,
  Circle,
  Play,
  Flame,
  Target,
  TrendingUp,
  Camera,
  Bell,
  Crown,
  ChevronRight
} from "lucide-react";
import { DailyExerciseModal } from "./DailyExerciseModal";
import { ProgressPhotosModal } from "./ProgressPhotosModal";

interface DashboardScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function DashboardScreen({ userProfile, onUpdateProfile }: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<"home" | "calendar" | "progress" | "profile">("home");
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showPhotosModal, setShowPhotosModal] = useState(false);

  const weekProgress = (userProfile.currentDay % 7) / 7 * 100;
  const totalProgress = ((userProfile.currentWeek - 1) * 7 + (userProfile.currentDay % 7 || 7)) / 28 * 100;

  const dailyChecklist = [
    { id: "breathing", label: "Respiração baixa", icon: "🫁" },
    { id: "transverse", label: "Ativação do transverso", icon: "💪" },
    { id: "vacuum", label: "Vácuo abdominal", icon: "🌬️" },
    { id: "rest", label: "Descanso ativo", icon: "🧘‍♀️" },
    { id: "posture", label: "Manter postura neutra", icon: "🎯" },
  ];

  const handleChecklistToggle = (id: string) => {
    const newChecklist = {
      ...userProfile.checklistProgress,
      [id]: !userProfile.checklistProgress[id],
    };
    
    const completedCount = Object.values(newChecklist).filter(Boolean).length;
    const newPoints = userProfile.points + (newChecklist[id] ? 10 : -10);
    
    onUpdateProfile({
      checklistProgress: newChecklist,
      points: Math.max(0, newPoints),
    });
  };

  const handleCompleteDay = () => {
    const allChecked = dailyChecklist.every(item => userProfile.checklistProgress[item.id]);
    
    if (allChecked) {
      const newDay = userProfile.currentDay + 1;
      const newWeek = Math.ceil(newDay / 7);
      const newStreak = userProfile.streak + 1;
      const bonusPoints = 50;
      
      onUpdateProfile({
        currentDay: newDay > 28 ? 28 : newDay,
        currentWeek: newWeek > 4 ? 4 : newWeek,
        streak: newStreak,
        points: userProfile.points + bonusPoints,
        completedDays: [...userProfile.completedDays, userProfile.currentDay],
        checklistProgress: {},
      });
    }
  };

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] rounded-3xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Olá! 👋</p>
            <h2 className="text-2xl font-bold">Sua Jornada</h2>
          </div>
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
            style={{ backgroundColor: userProfile.avatarColor }}
          >
            👤
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-2xl font-bold">{userProfile.streak}</span>
            </div>
            <p className="text-xs opacity-90">dias seguidos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-2xl font-bold">{userProfile.points}</span>
            </div>
            <p className="text-xs opacity-90">pontos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4" />
              <span className="text-2xl font-bold">{userProfile.completedDays.length}</span>
            </div>
            <p className="text-xs opacity-90">dias completos</p>
          </div>
        </div>
      </div>

      {/* Week Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#2A2A2A]">Semana {userProfile.currentWeek}</h3>
          <span className="text-sm text-[#3A4F66]">Dia {userProfile.currentDay % 7 || 7}/7</span>
        </div>
        <Progress value={weekProgress} className="h-2 mb-2" />
        <p className="text-xs text-[#3A4F66]">
          {Math.round(totalProgress)}% do programa completo
        </p>
      </div>

      {/* Today's Exercise */}
      <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FFF5E8] rounded-2xl p-6 border-2 border-[#62D8C9]/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#62D8C9] to-[#3A4F66] flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[#2A2A2A]">Exercício de Hoje</h3>
            <p className="text-xs text-[#3A4F66]">5-10 minutos</p>
          </div>
        </div>
        
        <p className="text-sm text-[#3A4F66] mb-4">
          {userProfile.currentDay <= 7 && "Respiração Diafragmática Básica"}
          {userProfile.currentDay > 7 && userProfile.currentDay <= 14 && "Ativação do Transverso"}
          {userProfile.currentDay > 14 && userProfile.currentDay <= 21 && "Hipopressivo Básico (LPF)"}
          {userProfile.currentDay > 21 && "Sequência Completa Avançada"}
        </p>
        
        <Button 
          onClick={() => setShowExerciseModal(true)}
          className="w-full bg-gradient-to-r from-[#62D8C9] to-[#3A4F66] hover:from-[#5BC5B7] hover:to-[#2E4155] text-white"
        >
          <Play className="w-4 h-4 mr-2" />
          Começar Exercício
        </Button>
      </div>

      {/* Daily Checklist */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#2A2A2A] mb-4">Checklist Diário</h3>
        <div className="space-y-3">
          {dailyChecklist.map((item) => (
            <button
              key={item.id}
              onClick={() => handleChecklistToggle(item.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors"
            >
              {userProfile.checklistProgress[item.id] ? (
                <CheckCircle2 className="w-6 h-6 text-[#62D8C9] flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-[#62D8C9]/30 flex-shrink-0" />
              )}
              <span className="text-2xl">{item.icon}</span>
              <span className={`text-sm ${userProfile.checklistProgress[item.id] ? 'text-[#2A2A2A] font-medium' : 'text-[#3A4F66]'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
        
        {dailyChecklist.every(item => userProfile.checklistProgress[item.id]) && (
          <Button 
            onClick={handleCompleteDay}
            className="w-full mt-4 bg-gradient-to-r from-[#A8D5BA] to-[#7FB69E] hover:from-[#97C4A9] hover:to-[#6EA58D] text-white"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Concluir Dia
          </Button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setShowPhotosModal(true)}
          className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <Camera className="w-8 h-8 text-[#62D8C9] mb-2" />
          <p className="text-sm font-semibold text-[#2A2A2A]">Fotos de Progresso</p>
        </button>
        
        <button className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <Crown className="w-8 h-8 text-[#62D8C9] mb-2" />
          <p className="text-sm font-semibold text-[#2A2A2A]">Upgrade Premium</p>
          <p className="text-xs text-[#3A4F66]">Receitas anti-inflamação</p>
        </button>
      </div>
    </div>
  );

  const renderCalendarTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2A2A2A]">Calendário</h2>
      
      {[1, 2, 3, 4].map((week) => (
        <div key={week} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-[#2A2A2A] mb-4">Semana {week}</h3>
          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const dayNumber = (week - 1) * 7 + day;
              const isCompleted = userProfile.completedDays.includes(dayNumber);
              const isCurrent = dayNumber === userProfile.currentDay;
              const isFuture = dayNumber > userProfile.currentDay;
              
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold ${
                    isCompleted
                      ? "bg-gradient-to-br from-[#62D8C9] to-[#3A4F66] text-white"
                      : isCurrent
                      ? "bg-[#62D8C9]/20 text-[#62D8C9] border-2 border-[#62D8C9]"
                      : isFuture
                      ? "bg-[#FAF8F5] text-[#3A4F66]/50"
                      : "bg-[#FAF8F5] text-[#3A4F66]"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : dayNumber}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderProgressTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2A2A2A]">Seu Progresso</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#62D8C9] to-[#3A4F66] rounded-2xl p-6 text-white">
          <Flame className="w-8 h-8 mb-2" />
          <p className="text-3xl font-bold">{userProfile.streak}</p>
          <p className="text-sm opacity-90">Dias Seguidos</p>
        </div>
        
        <div className="bg-gradient-to-br from-[#A8D5BA] to-[#7FB69E] rounded-2xl p-6 text-white">
          <Trophy className="w-8 h-8 mb-2" />
          <p className="text-3xl font-bold">{userProfile.points}</p>
          <p className="text-sm opacity-90">Pontos Totais</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#2A2A2A] mb-4">Progresso do Programa</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#3A4F66]">Semana 1</span>
              <span className="text-[#2A2A2A] font-semibold">
                {userProfile.completedDays.filter(d => d <= 7).length}/7
              </span>
            </div>
            <Progress 
              value={(userProfile.completedDays.filter(d => d <= 7).length / 7) * 100} 
              className="h-2"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#3A4F66]">Semana 2</span>
              <span className="text-[#2A2A2A] font-semibold">
                {userProfile.completedDays.filter(d => d > 7 && d <= 14).length}/7
              </span>
            </div>
            <Progress 
              value={(userProfile.completedDays.filter(d => d > 7 && d <= 14).length / 7) * 100} 
              className="h-2"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#3A4F66]">Semana 3</span>
              <span className="text-[#2A2A2A] font-semibold">
                {userProfile.completedDays.filter(d => d > 14 && d <= 21).length}/7
              </span>
            </div>
            <Progress 
              value={(userProfile.completedDays.filter(d => d > 14 && d <= 21).length / 7) * 100} 
              className="h-2"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#3A4F66]">Semana 4</span>
              <span className="text-[#2A2A2A] font-semibold">
                {userProfile.completedDays.filter(d => d > 21 && d <= 28).length}/7
              </span>
            </div>
            <Progress 
              value={(userProfile.completedDays.filter(d => d > 21 && d <= 28).length / 7) * 100} 
              className="h-2"
            />
          </div>
        </div>
      </div>

      {/* Photos */}
      <button 
        onClick={() => setShowPhotosModal(true)}
        className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Camera className="w-10 h-10 text-[#62D8C9]" />
            <div className="text-left">
              <h3 className="font-bold text-[#2A2A2A]">Fotos de Progresso</h3>
              <p className="text-sm text-[#3A4F66]">Registre sua evolução</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#3A4F66]" />
        </div>
      </button>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#2A2A2A] mb-4">Conquistas</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className={`text-center p-4 rounded-xl ${userProfile.streak >= 3 ? 'bg-[#62D8C9]/20' : 'bg-[#FAF8F5]'}`}>
            <div className="text-3xl mb-2">🔥</div>
            <p className="text-xs text-[#3A4F66]">3 dias seguidos</p>
          </div>
          <div className={`text-center p-4 rounded-xl ${userProfile.streak >= 7 ? 'bg-[#62D8C9]/20' : 'bg-[#FAF8F5]'}`}>
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-xs text-[#3A4F66]">1 semana</p>
          </div>
          <div className={`text-center p-4 rounded-xl ${userProfile.completedDays.length >= 14 ? 'bg-[#62D8C9]/20' : 'bg-[#FAF8F5]'}`}>
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-xs text-[#3A4F66]">14 dias</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2A2A2A]">Perfil</h2>
      
      {/* Avatar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
        <div 
          className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg mb-4"
          style={{ backgroundColor: userProfile.avatarColor }}
        >
          👤
        </div>
        <h3 className="font-bold text-[#2A2A2A] text-xl mb-1">Minha Jornada</h3>
        <p className="text-sm text-[#3A4F66]">Nível {userProfile.programLevel}</p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between hover:bg-[#FAF8F5] transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-[#62D8C9]" />
            <span className="text-[#2A2A2A]">Notificações</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#3A4F66]" />
        </button>
        
        <button className="w-full p-4 flex items-center justify-between hover:bg-[#FAF8F5] transition-colors border-t border-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-[#62D8C9]" />
            <span className="text-[#2A2A2A]">Upgrade Premium</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#3A4F66]" />
        </button>
        
        <button className="w-full p-4 flex items-center justify-between hover:bg-[#FAF8F5] transition-colors border-t border-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-[#62D8C9]" />
            <span className="text-[#2A2A2A]">Meu Progresso</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#3A4F66]" />
        </button>
      </div>

      {/* Info */}
      <div className="bg-[#FFF9F0] border-l-4 border-[#FF8A7A] p-4 rounded-r-xl">
        <p className="text-sm text-[#3A4F66]">
          💝 Continue sua jornada diariamente para melhores resultados. Lembre-se: consistência é a chave!
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#F8F8F8] pb-24">
        <div className="max-w-2xl mx-auto p-6 pt-8">
          {activeTab === "home" && renderHomeTab()}
          {activeTab === "calendar" && renderCalendarTab()}
          {activeTab === "progress" && renderProgressTab()}
          {activeTab === "profile" && renderProfileTab()}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] shadow-lg">
          <div className="max-w-2xl mx-auto px-6 py-3">
            <div className="flex items-center justify-around">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex flex-col items-center gap-1 p-2 ${
                  activeTab === "home" ? "text-[#62D8C9]" : "text-[#3A4F66]"
                }`}
              >
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">Início</span>
              </button>
              
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex flex-col items-center gap-1 p-2 ${
                  activeTab === "calendar" ? "text-[#62D8C9]" : "text-[#3A4F66]"
                }`}
              >
                <Calendar className="w-6 h-6" />
                <span className="text-xs font-medium">Calendário</span>
              </button>
              
              <button
                onClick={() => setActiveTab("progress")}
                className={`flex flex-col items-center gap-1 p-2 ${
                  activeTab === "progress" ? "text-[#62D8C9]" : "text-[#3A4F66]"
                }`}
              >
                <Trophy className="w-6 h-6" />
                <span className="text-xs font-medium">Progresso</span>
              </button>
              
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex flex-col items-center gap-1 p-2 ${
                  activeTab === "profile" ? "text-[#62D8C9]" : "text-[#3A4F66]"
                }`}
              >
                <User className="w-6 h-6" />
                <span className="text-xs font-medium">Perfil</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showExerciseModal && (
        <DailyExerciseModal 
          day={userProfile.currentDay}
          onClose={() => setShowExerciseModal(false)}
        />
      )}

      {showPhotosModal && (
        <ProgressPhotosModal
          userProfile={userProfile}
          onUpdateProfile={onUpdateProfile}
          onClose={() => setShowPhotosModal(false)}
        />
      )}
    </>
  );
}