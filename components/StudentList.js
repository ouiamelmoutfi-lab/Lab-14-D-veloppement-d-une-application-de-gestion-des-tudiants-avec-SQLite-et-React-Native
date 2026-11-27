import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function StudentList({ students, onDelete, onEdit, ListHeaderComponent }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.prenom} {item.nom}</Text>
        <Text style={styles.details}>{item.filiere} - {item.niveau}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.editButton}>
          <Text style={styles.btnText}>Éditer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.btnText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={students}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  infoContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  details: { fontSize: 14, color: '#64748b', marginTop: 2 },
  email: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 8 },
  editButton: { backgroundColor: '#3b82f6', padding: 8, borderRadius: 6 },
  deleteButton: { backgroundColor: '#ef4444', padding: 8, borderRadius: 6 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});
