"use client";

import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/app/WelcomeScreen";
import { QuestionnaireScreen } from "@/components/app/QuestionnaireScreen";
import { ResultScreen } from "@/components/app/ResultScreen";
import { DashboardScreen } from "@/components/app/DashboardScreen";
import { PaymentScreen } from "@/components/app/PaymentScreen";
import { AuthScreen } from "@/components/app/AuthScreen";
import { supabase } from "@/lib/supabase";

export type UserLevel = "beginner" | "intermediate" | "advanced";
export type ProgramLevel = 1 | 2 | 3;

export interface UserProfile {
  level: UserLevel;
  programLevel: ProgramLevel;
  isPremium: boolean;
  currentDay: number;
  currentWeek: number;
  streak: number;
  points: number;
  completedDays: number[];
  checklistProgress: Record<string, boolean>;
  beforePhoto?: string;
  afterPhoto?: string;
  avatarColor: string;
}

export default function Home() {
  const [screen, setScreen] = useState<"auth" | "welcome" | "questionnaire" | "result" | "payment" | "dashboard">("auth");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<number, number>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setUserId(session.user.id);
          await loadUserProfile(session.user.id);
        } else if (event === "SIGNED_OUT") {
          setUserId(null);
          setUserProfile(null);
          setScreen("auth");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUserId(session.user.id);
        await loadUserProfile(session.user.id);
      } else {
        setScreen("auth");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setScreen("auth");
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", uid)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        const profile: UserProfile = {
          level: data.level,
          programLevel: data.program_level,
          isPremium: data.is_premium,
          currentDay: data.current_day,
          currentWeek: data.current_week,
          streak: data.streak,
          points: data.points,
          completedDays: data.completed_days || [],
          checklistProgress: data.checklist_progress || {},
          beforePhoto: data.before_photo,
          afterPhoto: data.after_photo,
          avatarColor: data.avatar_color,
        };
        setUserProfile(profile);
        
        if (profile.isPremium) {
          setScreen("dashboard");
        } else {
          setScreen("welcome");
        }
      } else {
        setScreen("welcome");
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      setScreen("welcome");
    }
  };

  const handleAuthSuccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUserId(session.user.id);
      await loadUserProfile(session.user.id);
    }
  };

  const handleStartQuestionnaire = () => {
    setScreen("questionnaire");
  };

  const handleQuestionnaireComplete = async (answers: Record<number, number>) => {
    setQuestionnaireAnswers(answers);
    
    // Calculate level based on answers
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const avgScore = totalScore / Object.keys(answers).length;
    
    let level: UserLevel;
    let programLevel: ProgramLevel;
    
    if (avgScore <= 1.5) {
      level = "beginner";
      programLevel = 1;
    } else if (avgScore <= 2.5) {
      level = "intermediate";
      programLevel = 2;
    } else {
      level = "advanced";
      programLevel = 3;
    }

    const newProfile: UserProfile = {
      level,
      programLevel,
      isPremium: false,
      currentDay: 1,
      currentWeek: 1,
      streak: 0,
      points: 0,
      completedDays: [],
      checklistProgress: {},
      avatarColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
    };

    setUserProfile(newProfile);

    // Save to Supabase
    if (userId) {
      try {
        await supabase.from("user_profiles").upsert({
          user_id: userId,
          level: newProfile.level,
          program_level: newProfile.programLevel,
          is_premium: newProfile.isPremium,
          current_day: newProfile.currentDay,
          current_week: newProfile.currentWeek,
          streak: newProfile.streak,
          points: newProfile.points,
          completed_days: newProfile.completedDays,
          checklist_progress: newProfile.checklistProgress,
          avatar_color: newProfile.avatarColor,
          updated_at: new Date().toISOString(),
        });

        await supabase.from("questionnaire_answers").insert({
          user_id: userId,
          answers,
        });
      } catch (error) {
        console.error("Erro ao salvar perfil:", error);
      }
    }

    setScreen("result");
  };

  const handleContinueToPayment = () => {
    setScreen("payment");
  };

  const handlePaymentComplete = async () => {
    if (userProfile && userId) {
      const updatedProfile = { ...userProfile, isPremium: true };
      setUserProfile(updatedProfile);

      try {
        await supabase
          .from("user_profiles")
          .update({ is_premium: true, updated_at: new Date().toISOString() })
          .eq("user_id", userId);
      } catch (error) {
        console.error("Erro ao atualizar premium:", error);
      }

      setScreen("dashboard");
    }
  };

  const handleUpdateProfile = async (updates: Partial<UserProfile>) => {
    if (userProfile && userId) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);

      try {
        await supabase
          .from("user_profiles")
          .update({
            current_day: updatedProfile.currentDay,
            current_week: updatedProfile.currentWeek,
            streak: updatedProfile.streak,
            points: updatedProfile.points,
            completed_days: updatedProfile.completedDays,
            checklist_progress: updatedProfile.checklistProgress,
            before_photo: updatedProfile.beforePhoto,
            after_photo: updatedProfile.afterPhoto,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#2A2A2A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#62D8C9] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#2A2A2A]">
      {screen === "auth" && (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}
      
      {screen === "welcome" && (
        <WelcomeScreen onStart={handleStartQuestionnaire} />
      )}
      
      {screen === "questionnaire" && (
        <QuestionnaireScreen onComplete={handleQuestionnaireComplete} />
      )}
      
      {screen === "result" && userProfile && (
        <ResultScreen 
          userProfile={userProfile} 
          onContinue={handleContinueToPayment}
        />
      )}
      
      {screen === "payment" && (
        <PaymentScreen onComplete={handlePaymentComplete} />
      )}
      
      {screen === "dashboard" && userProfile && (
        <DashboardScreen 
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </main>
  );
}
