import {Habit} from './habit';

export interface Category {
  id: number;
  name: string;
  description?: string;
  habits?: Habit[];
}
