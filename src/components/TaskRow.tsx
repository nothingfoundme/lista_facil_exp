import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import type { Task } from '../types/task';

type TaskRowProps = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
};

export function TaskRow({ task, onToggle, onDelete }: TaskRowProps) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={`${task.title}. ${task.completed ? 'Concluída' : 'Pendente'}. Toque para alterar.`}
        accessibilityState={{ checked: task.completed }}
        onPress={onToggle}
        hitSlop={6}
        style={({ pressed }) => [styles.checkbox, task.completed && styles.checkboxChecked, pressed && styles.pressed]}
      >
        {task.completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Marcar ${task.title} como ${task.completed ? 'pendente' : 'concluída'}`}
        onPress={onToggle}
        style={styles.taskCopy}
      >
        <Text
          style={[styles.title, task.completed && styles.titleCompleted]}
          numberOfLines={3}
        >
          {task.title}
        </Text>
        <Text style={[styles.status, task.completed && styles.statusCompleted]}>
          {task.completed ? 'Concluída' : 'Pendente'}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Excluir tarefa ${task.title}`}
        onPress={onDelete}
        hitSlop={10}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
      >
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 74,
    paddingVertical: 13,
    paddingHorizontal: 14,
    shadowColor: '#18263D',
    shadowOpacity: 0.025,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.6,
    borderColor: '#C9D1DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  checkmark: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '800',
  },
  taskCopy: {
    flex: 1,
    paddingVertical: 1,
  },
  title: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  titleCompleted: {
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
  status: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  statusCompleted: {
    color: colors.green,
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteText: {
    color: '#A1AABB',
    fontSize: 25,
    lineHeight: 27,
    fontWeight: '300',
  },
  pressed: {
    opacity: 0.65,
  },
});
