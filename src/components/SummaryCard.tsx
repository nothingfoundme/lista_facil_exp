import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type SummaryCardProps = {
  pending: number;
  completed: number;
};

export function SummaryCard({ pending, completed }: SummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.stat}>
        <View style={[styles.dot, styles.pendingDot]} />
        <View>
          <Text style={styles.label}>Pendentes</Text>
          <Text accessibilityLabel={`${pending} tarefas pendentes`} style={styles.count}>
            {pending}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <View style={[styles.dot, styles.completedDot]} />
        <View>
          <Text style={styles.label}>Concluídas</Text>
          <Text accessibilityLabel={`${completed} tarefas concluídas`} style={styles.count}>
            {completed}
          </Text>
        </View>
      </View>
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
    borderRadius: 18,
    paddingVertical: 17,
    paddingHorizontal: 18,
    marginBottom: 26,
    shadowColor: '#18263D',
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 1,
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 11,
  },
  pendingDot: {
    backgroundColor: colors.primary,
  },
  completedDot: {
    backgroundColor: colors.green,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 3,
  },
  count: {
    color: colors.ink,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: 39,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
});
