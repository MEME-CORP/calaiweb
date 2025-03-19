import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Meal, 
  MealCategory, 
  NutritionalTotals, 
  NutritionalTargets, 
  MacroPercentages
} from '../features/meals/types';
import { useProfileStore } from './profileStore';
import { GoalType } from '../features/profile/onboarding/GoalSelection';
import { ActivityLevel } from '../features/profile/onboarding/ActivityLevel';

interface MealState {
  // Meal data
  meals: Meal[];
  dailyTargets: NutritionalTargets;
  
  // Actions
  addMeal: (meal: Meal) => void;
  editMeal: (mealId: string, updatedMeal: Partial<Meal>) => void;
  deleteMeal: (mealId: string) => void;
  
  // Calculations
  getDailyTotals: () => NutritionalTotals;
  getMacroPercentages: () => MacroPercentages;
  
  // Targets
  setDailyTargets: (targets: NutritionalTargets) => void;
  getDailyTargets: () => NutritionalTargets;
  calculateRecommendedTargets: () => NutritionalTargets;
}

// Initial state
const initialTargets: NutritionalTargets = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      // Initial state
      meals: [],
      dailyTargets: initialTargets,
      
      // Meal CRUD operations
      addMeal: (meal) => {
        set((state) => ({
          meals: [...state.meals, meal],
        }));
      },
      
      editMeal: (mealId, updatedMeal) => {
        set((state) => ({
          meals: state.meals.map((meal) => 
            meal.id === mealId ? { ...meal, ...updatedMeal } : meal
          ),
        }));
      },
      
      deleteMeal: (mealId) => {
        set((state) => ({
          meals: state.meals.filter((meal) => meal.id !== mealId),
        }));
      },
      
      // Calculations
      getDailyTotals: () => {
        const { meals } = get();
        const today = new Date().toISOString().split('T')[0];
        
        // Filter meals for today
        const todayMeals = meals.filter(meal => 
          meal.timestamp.startsWith(today)
        );
        
        // Calculate totals
        const totals = todayMeals.reduce(
          (acc, meal) => {
            return {
              calories: acc.calories + meal.calories,
              protein: acc.protein + meal.protein,
              carbs: acc.carbs + meal.carbs,
              fat: acc.fat + meal.fat,
            };
          },
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
        
        return totals;
      },
      
      getMacroPercentages: () => {
        const totals = get().getDailyTotals();
        const { protein, carbs, fat } = totals;
        const totalMacros = protein + carbs + fat;
        
        if (totalMacros === 0) {
          return { protein: 33.33, carbs: 33.33, fat: 33.34 };
        }
        
        return {
          protein: Math.round((protein / totalMacros) * 100),
          carbs: Math.round((carbs / totalMacros) * 100),
          fat: Math.round((fat / totalMacros) * 100),
        };
      },
      
      // Target management
      setDailyTargets: (targets) => {
        set({ dailyTargets: targets });
      },
      
      getDailyTargets: () => {
        return get().dailyTargets;
      },
      
      calculateRecommendedTargets: () => {
        // Get user profile data
        const { 
          goalType, 
          gender, 
          age, 
          weight, 
          height,
          activityLevel,
          weightChangeGoal,
        } = useProfileStore.getState();
        
        if (!weight || !height || !age) {
          return initialTargets;
        }
        
        // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
        let bmr = 0;
        if (gender === 'MALE') {
          bmr = 10 * weight + 6.25 * height - 5 * (age || 30) + 5;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * (age || 30) - 161;
        }
        
        // Apply activity multiplier
        let activityMultiplier = 1.2; // Default to sedentary
        switch(activityLevel) {
          case ActivityLevel.Sedentary:
            activityMultiplier = 1.2;
            break;
          case ActivityLevel.LightlyActive:
            activityMultiplier = 1.375;
            break;
          case ActivityLevel.ModeratelyActive:
            activityMultiplier = 1.55;
            break;
          case ActivityLevel.VeryActive:
            activityMultiplier = 1.725;
            break;
          case ActivityLevel.ExtremelyActive:
            activityMultiplier = 1.9;
            break;
        }
        
        let tdee = bmr * activityMultiplier;
        
        // Adjust based on goal
        let calorieTarget = tdee;
        switch(goalType) {
          case GoalType.WeightLoss:
            calorieTarget = tdee - 500; // 500 calorie deficit
            break;
          case GoalType.Maintenance:
            calorieTarget = tdee;
            break;
          case GoalType.MuscleGain:
            calorieTarget = tdee + 300; // 300 calorie surplus
            break;
        }
        
        // Ensure minimum calorie floor
        calorieTarget = Math.max(1200, calorieTarget);
        
        // Calculate macros based on goal
        let proteinPercentage = 0;
        let carbsPercentage = 0;
        let fatPercentage = 0;
        
        switch(goalType) {
          case GoalType.WeightLoss:
            proteinPercentage = 0.4; // 40% protein
            carbsPercentage = 0.3;   // 30% carbs
            fatPercentage = 0.3;     // 30% fat
            break;
          case GoalType.Maintenance:
            proteinPercentage = 0.3; // 30% protein
            carbsPercentage = 0.4;   // 40% carbs
            fatPercentage = 0.3;     // 30% fat
            break;
          case GoalType.MuscleGain:
            proteinPercentage = 0.35; // 35% protein
            carbsPercentage = 0.45;   // 45% carbs
            fatPercentage = 0.2;      // 20% fat
            break;
        }
        
        // Calculate macros in grams
        // Protein: 4 calories per gram
        // Carbs: 4 calories per gram
        // Fat: 9 calories per gram
        const proteinTarget = Math.round((calorieTarget * proteinPercentage) / 4);
        const carbsTarget = Math.round((calorieTarget * carbsPercentage) / 4);
        const fatTarget = Math.round((calorieTarget * fatPercentage) / 9);
        
        // Round calorie target
        calorieTarget = Math.round(calorieTarget);
        
        return {
          calories: calorieTarget,
          protein: proteinTarget,
          carbs: carbsTarget,
          fat: fatTarget,
        };
      },
    }),
    {
      name: 'nutrition-meal-storage',
      partialize: (state) => ({
        meals: state.meals,
        dailyTargets: state.dailyTargets,
      }),
    }
  )
);

export default useMealStore;