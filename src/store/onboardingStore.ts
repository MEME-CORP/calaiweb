import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  isCompleted: boolean;
  currentStep: number;
  completeOnboarding: () => void;
  setCurrentStep: (step: number) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isCompleted: false,
      currentStep: 1,
      
      completeOnboarding: () => {
        set({
          isCompleted: true,
        });
      },
      
      setCurrentStep: (step) => {
        set({
          currentStep: step,
        });
      },
      
      resetOnboarding: () => {
        set({
          isCompleted: false,
          currentStep: 1,
        });
      },
    }),
    {
      name: 'nutrition-onboarding-storage',
      partialize: (state) => ({
        isCompleted: state.isCompleted,
        currentStep: state.currentStep,
      }),
    }
  )
);

export default useOnboardingStore;