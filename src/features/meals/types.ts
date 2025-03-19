/**
 * Types for meal tracking functionality
 */

export enum MealCategory {
  Breakfast = 'BREAKFAST',
  Lunch = 'LUNCH',
  Dinner = 'DINNER',
  Snack = 'SNACK'
}

export interface Meal {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  category: MealCategory;
  timestamp: string; // ISO date string
}

export interface NutritionalTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionalTargets {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
}

export interface MacroPercentages {
  protein: number;
  carbs: number;
  fat: number;
}