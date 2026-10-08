import { useCallback, useEffect, useRef, useState } from 'react';
import { loadTasks, saveTasks } from '../storage/tasksStorage';
import type { Task } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [canPersist, setCanPersist] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function hydrate() {
      try {
        const savedTasks = await loadTasks();
        if (mounted.current) {
          setTasks(savedTasks);
          setCanPersist(true);
        }
      } catch {
        if (mounted.current) {
          setStorageError(
            'Não foi possível ler os dados salvos neste dispositivo. As alterações desta sessão podem não ser mantidas.',
          );
        }
      } finally {
        if (mounted.current) setIsHydrated(true);
      }
    }

    void hydrate();
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated || !canPersist) return;

    const snapshot = tasks;
    writeQueue.current = writeQueue.current
      .catch(() => undefined)
      .then(async () => {
        try {
          await saveTasks(snapshot);
          if (mounted.current) setStorageError(null);
        } catch {
          if (mounted.current) {
            setStorageError(
              'Não foi possível salvar as tarefas neste dispositivo. Verifique o espaço disponível e tente novamente.',
            );
          }
        }
      });
  }, [tasks, isHydrated, canPersist]);

  const addTask = useCallback((title: string) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const task: Task = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
      title: cleanTitle,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }, []);

  return {
    tasks,
    isHydrated,
    storageError,
    addTask,
    toggleTask,
    deleteTask,
  };
}
