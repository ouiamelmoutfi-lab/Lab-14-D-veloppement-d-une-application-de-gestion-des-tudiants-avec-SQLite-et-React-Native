import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StudentStats({ stats }) {
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Statistiques par Filière</Text>
      {stats.map((item, index) => (
        <View key={index} style={styles.statRow}>
          <Text style={styles.filiereName}>{item.filiere}</Text>
          <Text style={styles.filiereCount}>{item.count} étudiant(s)</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
  statsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#1e293b' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  filiereName: { fontSize: 14, color: '#475569' },
  filiereCount: { fontSize: 14, fontWeight: 'bold', color: '#2563eb' }
});
