export interface Workout {
  id: string;
  name: string;
  description: string;
  type: string;
}
export interface Exercise {
  id: string;
  name: string;
  description: string;
  series: number;
  reps: number;
  rest: number;
  weight: number;
}
export interface CurrentWorkout {
  details: Workout;
  exercises: Exercise[];
}
