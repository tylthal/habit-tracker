import {IHabit, Habit} from './habit';

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  habits: IHabit[];
}

export class Category implements ICategory {
  id: number;
  name: string;
  description: string;
  habits: Habit[];

  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.habits = new Array<Habit>();
  }
}
