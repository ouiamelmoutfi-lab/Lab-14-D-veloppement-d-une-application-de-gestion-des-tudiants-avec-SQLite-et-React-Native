import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function StudentForm({ onSubmit, editingStudent }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [filiere, setFiliere] = useState('');
  const [niveau, setNiveau] = useState('');

  useEffect(() => {
    setNom(editingStudent?.nom ?? '');
    setPrenom(editingStudent?.prenom ?? '');
    setEmail(editingStudent?.email ?? '');
    setFiliere(editingStudent?.filiere ?? '');
    setNiveau(editingStudent?.niveau ?? '');
  }, [editingStudent]);

  const handleSubmit = async () => {
    if (!nom.trim() || !prenom.trim() || !email.trim() || !filiere.trim() || !niveau.trim()) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    if (!email.includes('@')) {
      alert('Veuillez saisir une adresse email valide.');
      return;
    }
    const saved = await onSubmit({ nom, prenom, email, filiere, niveau });
    if (!saved) return;
    setNom('');
    setPrenom('');
    setEmail('');
    setFiliere('');
    setNiveau('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Filière" value={filiere} onChangeText={setFiliere} />
      <TextInput style={styles.input} placeholder="Niveau" value={niveau} onChangeText={setNiveau} />
      <Button title={editingStudent ? "Mettre à jour" : "Ajouter l'étudiant"} onPress={handleSubmit} color="#2563eb" />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', padding: 10, borderRadius: 6, marginBottom: 10, backgroundColor: '#fff' }
});
