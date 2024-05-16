export interface Workout {
  id: string;
  title: string;
  description: string;
}
export interface Exercise {
  id: string;
  title: string;
  description: string;
  series: number;
  reps: number;
  rest: number;
  weight: number;
}
export interface CurrentWorkout extends Workout {
  exercises: Exercise[];
}
