export interface Workout {
  id: string;
  title: string;
  description: string;
}
export interface Exercise {
  id: string;
  title: string;
  description: string;
  workoutId: string;
}
export interface CurrentWorkout extends Workout {
  exercises: Exercise[];
}
