import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FilterTabs } from './src/components/FilterTabs';
import { SummaryCard } from './src/components/SummaryCard';
import { TaskRow } from './src/components/TaskRow';
import { useTasks } from './src/hooks/useTasks';
import { colors } from './src/theme/colors';
import type { TaskFilter } from './src/types/task';

export default function App() {
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const { tasks, isHydrated, storageError, addTask, toggleTask, deleteTask } =
    useTasks();

  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - pendingCount;

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [filter, tasks]);

  const handleAddTask = () => {
    const title = draft.trim();
    if (!title) return;

    addTask(title);
    setDraft('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        data={visibleTasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <TaskRow
            task={item}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View>
            <View style={styles.brandRow}>
              <View style={styles.brandMark}>
                <Text style={styles.brandCheck}>✓</Text>
              </View>
              <Text style={styles.brandName}>LISTA FÁCIL</Text>
            </View>

            <Text style={styles.heading}>Organize seu dia</Text>
            <Text style={styles.subtitle}>
              Pequenos passos também levam longe.
            </Text>

            <SummaryCard pending={pendingCount} completed={completedCount} />

            <Text style={styles.sectionTitle}>O que você precisa fazer?</Text>
            <View style={styles.inputRow}>
              <TextInput
                accessibilityLabel="Nova tarefa"
                style={styles.input}
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={handleAddTask}
                placeholder="Ex.: separar as compras"
                placeholderTextColor={colors.placeholder}
                returnKeyType="done"
                maxLength={120}
                autoCorrect
                editable={isHydrated}
                selectionColor={colors.primary}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Adicionar tarefa"
                accessibilityState={{ disabled: !draft.trim() || !isHydrated }}
                disabled={!draft.trim() || !isHydrated}
                onPress={handleAddTask}
                style={({ pressed }) => [
                  styles.addButton,
                  (!draft.trim() || !isHydrated) && styles.addButtonDisabled,
                  pressed && draft.trim() && isHydrated && styles.buttonPressed,
                ]}
              >
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            </View>

            {storageError ? (
              <View accessibilityRole="alert" style={styles.errorBanner}>
                <Text style={styles.errorText}>{storageError}</Text>
              </View>
            ) : null}

            <View style={styles.listHeadingRow}>
              <Text style={styles.sectionTitle}>Suas tarefas</Text>
              <Text style={styles.totalCount}>
                {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
              </Text>
            </View>
            <FilterTabs
              selected={filter}
              onSelect={setFilter}
              counts={{ all: tasks.length, pending: pendingCount, completed: completedCount }}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>
                {tasks.length === 0 ? '＋' : filter === 'completed' ? '✓' : '○'}
              </Text>
            </View>
            <Text style={styles.emptyTitle}>
              {tasks.length === 0
                ? 'Sua lista está vazia'
                : filter === 'pending'
                  ? 'Tudo em dia por aqui'
                  : filter === 'completed'
                    ? 'Ainda sem tarefas concluídas'
                    : 'Nenhuma tarefa encontrada'}
            </Text>
            <Text style={styles.emptyCopy}>
              {tasks.length === 0
                ? 'Adicione sua primeira tarefa no campo acima.'
                : filter === 'pending'
                  ? 'Todas as tarefas estão concluídas.'
                  : 'As tarefas concluídas aparecerão aqui.'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 36,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandCheck: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 23,
  },
  brandName: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  heading: {
    color: colors.ink,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 22,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 11,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
    shadowColor: '#14243A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  input: {
    flex: 1,
    minHeight: 46,
    paddingHorizontal: 12,
    color: colors.ink,
    fontSize: 15,
  },
  addButton: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  addButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
  addButtonText: {
    color: colors.white,
    fontSize: 29,
    fontWeight: '400',
    lineHeight: 32,
    marginTop: -2,
  },
  errorBanner: {
    backgroundColor: colors.errorBackground,
    borderRadius: 12,
    padding: 12,
    marginTop: -10,
    marginBottom: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 18,
  },
  listHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalCount: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 11,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyIconText: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '600',
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 6,
  },
  separator: {
    height: 10,
  },
});
