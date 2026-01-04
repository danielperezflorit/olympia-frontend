import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder }) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || t('searchbar.search_placeholder')}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#0084C9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
});