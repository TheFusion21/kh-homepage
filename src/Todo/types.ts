export interface TodoItem {
  title: string;
  done: boolean;
}
export interface TodoCard {
  title: string;
  description?: string;
  dueDate?: Date;
  todos: TodoItem[];
}
export interface TodoCategory {
  title: string;
  description?: string;
  cards: TodoCard[];
}