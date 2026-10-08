import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import type { TaskFilter } from '../types/task';

type FilterTabsProps = {
  selected: TaskFilter;
  onSelect: (filter: TaskFilter) => void;
  counts: Record<TaskFilter, number>;
};

const options: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Concluídas' },
];

export function FilterTabs({ selected, onSelect, counts }: FilterTabsProps) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const isSelected = selected === option.key;
        return (
          <Pressable
            key={option.key}
            accessibilityRole="button"
            accessibilityLabel={`${option.label}, ${counts[option.key]} tarefas`}
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(option.key)}
            style={({ pressed }) => [
              styles.tab,
              isSelected && styles.tabSelected,
              pressed && styles.tabPressed,
            ]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {option.label}
            </Text>
            <Text style={[styles.count, isSelected && styles.countSelected]}>
              {counts[option.key]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 17,
  },
  tab: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.whiteMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabSelected: {
    backgroundColor: colors.softBlue,
    borderColor: '#D5E0FF',
  },
  tabPressed: {
    opacity: 0.75,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.primary,
  },
  count: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  countSelected: {
    color: colors.primary,
  },
});
