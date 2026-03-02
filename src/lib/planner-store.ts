export interface PlannerTask {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = "gratitude-planner-tasks";

export function getTasks(): PlannerTask[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getTasksByDate(date: string): PlannerTask[] {
  return getTasks().filter(t => t.date === date);
}

export function getTodayTasks(): PlannerTask[] {
  const today = new Date().toISOString().slice(0, 10);
  return getTasksByDate(today);
}

export function addTask(text: string, date?: string): PlannerTask {
  const tasks = getTasks();
  const task: PlannerTask = {
    id: crypto.randomUUID(),
    text,
    date: date || new Date().toISOString().slice(0, 10),
    completed: false,
    createdAt: Date.now(),
  };
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return task;
}

export function toggleTask(id: string): void {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}

export function deleteTask(id: string): void {
  const tasks = getTasks().filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
