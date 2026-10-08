import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '../types/task';

const STORAGE_KEY = '@lista-facil/tasks:v1';

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Partial<Task>;
  return (
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.title === 'string' &&
    candidate.title.trim().length > 0 &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'number' &&
    Number.isFinite(candidate.createdAt)
  );
}

export async function loadTasks(): Promise<Task[]> {
  const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
  if (storedValue === null) return [];

  const parsed: unknown = JSON.parse(storedValue);
  if (!Array.isArray(parsed)) return [];

  return parsed.filter(isTask);
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
