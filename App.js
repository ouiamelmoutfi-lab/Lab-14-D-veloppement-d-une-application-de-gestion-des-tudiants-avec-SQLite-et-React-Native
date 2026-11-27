import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getDBConnection, createTable } from './database/database';
import { getStudentsFromDb, insertStudentIntoDb, deleteStudentFromDb, updateStudentInDb, getStudentStatsByFiliere } from './services/studentService';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';
import StudentStats from './components/StudentStats';

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [stats, setStats] = useState([]);
  const writeInProgress = useRef(false);

  const loadData = async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedStudents = await getStudentsFromDb();
      const studentStats = await getStudentStatsByFiliere();
      setStudents(storedStudents);
      setStats(studentStats);
    } catch (error) {
      console.error('Erreur chargement données:', error);
      alert('Erreur lors du chargement des données.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddOrUpdate = async (studentData) => {
    if (writeInProgress.current) return false;
    writeInProgress.current = true;
    try {
      if (editingStudent) {
        await updateStudentInDb({ ...studentData, id: editingStudent.id });
        setEditingStudent(null);
      } else {
        await insertStudentIntoDb(studentData);
      }
      await loadData();
      return true;
    } catch (error) {
      alert('Erreur lors de l\'enregistrement en base de données.');
      return false;
    } finally {
      writeInProgress.current = false;
    }
  };

  const handleDelete = async (id) => {
    if (writeInProgress.current) return;
    writeInProgress.current = true;
    try {
      await deleteStudentFromDb(id);
      if (editingStudent?.id === id) setEditingStudent(null);
      await loadData();
    } catch (error) {
      alert('Erreur lors de la suppression en base de données.');
    } finally {
      writeInProgress.current = false;
    }
  };

  const filteredStudents = students.filter(student =>
    [student.nom, student.prenom, student.filiere].some(value =>
      value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestion des Étudiants</Text>
      </View>
      <View style={styles.content}>
        <StudentList
          students={filteredStudents}
          onDelete={handleDelete}
          onEdit={setEditingStudent}
          ListHeaderComponent={
            <>
              <StudentForm onSubmit={handleAddOrUpdate} editingStudent={editingStudent} />
              <SearchBar value={searchText} onChangeText={setSearchText} />
              <StudentStats stats={stats} />
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { padding: 16, backgroundColor: '#2563eb', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 }
});
