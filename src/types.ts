export interface Workout {
  id: string;
  title: string;
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
export interface CurrentWorkout extends Workout {
  exercises: Exercise[];
}
