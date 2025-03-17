import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GoalType } from '../features/profile/onboarding/GoalSelection';
import { Gender } from '../features/profile/onboarding/PersonalDetails';
import { ActivityLevel } from '../features/profile/onboarding/ActivityLevel';
import { WeightChangeRate } from '../features/profile/onboarding/WeightGoalSetting';

// Weight change goal interface
interface WeightChangeGoal {
  currentWeight: number;
  targetWeight: number;
  rate: WeightChangeRate;
}

interface ProfileState {
  // Personal details
  name: string | null;
  goalType: GoalType;
  age: number | null;
  gender: Gender | null;
  height: number | null; // in cm
  weight: number | null; // in kg
  activityLevel: ActivityLevel | null;
  dietaryPreferences: string[];
  weightChangeGoal: WeightChangeGoal | null;
  targetWeight: number | null;
  weightChangeRate: WeightChangeRate | null;
  
  // Actions
  setUserProfile: (profile: Partial<ProfileState>) => void;
  setName: (name: string) => void;
  setGoalType: (goalType: GoalType) => void;
  setAge: (age: number) => void;
  setGender: (gender: Gender) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setActivityLevel: (level: ActivityLevel) => void;
  setDietaryPreferences: (preferences: string[]) => void;
  addDietaryPreference: (preference: string) => void;
  removeDietaryPreference: (preference: string) => void;
  setWeightChangeGoal: (goal: WeightChangeGoal) => void;
  setTargetWeight: (weight: number) => void;
  setWeightChangeRate: (rate: WeightChangeRate) => void;
  resetProfile: () => void;
}

// Initial state
const initialState = {
  name: null,
  goalType: GoalType.WeightLoss,
  age: null,
  gender: null,
  height: null,
  weight: null,
  activityLevel: null,
  dietaryPreferences: [],
  weightChangeGoal: null,
  targetWeight: null,
  weightChangeRate: null,
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setUserProfile: (profile) => {
        set((state) => ({
          ...state,
          ...profile,
        }));
      },
      
      setName: (name) => {
        set((state) => ({
          ...state,
          name,
        }));
      },
      
      setGoalType: (goalType) => {
        set((state) => ({
          ...state,
          goalType,
        }));
      },
      
      setAge: (age) => {
        set((state) => ({
          ...state,
          age,
        }));
      },
      
      setGender: (gender) => {
        set((state) => ({
          ...state,
          gender,
        }));
      },
      
      setHeight: (height) => {
        set((state) => ({
          ...state,
          height,
        }));
      },
      
      setWeight: (weight) => {
        set((state) => ({
          ...state,
          weight,
        }));
      },
      
      setActivityLevel: (level) => {
        set((state) => ({
          ...state,
          activityLevel: level,
        }));
      },
      
      setDietaryPreferences: (preferences) => {
        set((state) => ({
          ...state,
          dietaryPreferences: preferences,
        }));
      },
      
      addDietaryPreference: (preference) => {
        set((state) => ({
          ...state,
          dietaryPreferences: [...state.dietaryPreferences, preference],
        }));
      },
      
      removeDietaryPreference: (preference) => {
        set((state) => ({
          ...state,
          dietaryPreferences: state.dietaryPreferences.filter((p) => p !== preference),
        }));
      },
      
      setWeightChangeGoal: (goal) => {
        set((state) => ({
          ...state,
          weightChangeGoal: goal,
        }));
      },
      
      setTargetWeight: (weight) => {
        set((state) => ({
          ...state,
          targetWeight: weight,
        }));
      },
      
      setWeightChangeRate: (rate) => {
        set((state) => ({
          ...state,
          weightChangeRate: rate,
        }));
      },
      
      resetProfile: () => {
        set(initialState);
      },
    }),
    {
      name: 'nutrition-profile-storage',
      partialize: (state) => ({
        name: state.name,
        goalType: state.goalType,
        age: state.age,
        gender: state.gender,
        height: state.height,
        weight: state.weight,
        activityLevel: state.activityLevel,
        dietaryPreferences: state.dietaryPreferences,
        weightChangeGoal: state.weightChangeGoal,
        targetWeight: state.targetWeight,
        weightChangeRate: state.weightChangeRate,
      }),
    }
  )
);

export default useProfileStore;