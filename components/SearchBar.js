import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Rechercher par nom ou filière..."
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: { borderWidth: 1, borderColor: '#cbd5e1', padding: 10, borderRadius: 6, marginBottom: 15, backgroundColor: '#f8fafc' }
});
