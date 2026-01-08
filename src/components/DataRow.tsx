import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DataRowProps {
  label: string;
  value: string;
  onPress: () => void;
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, onPress }) => {
  return (
    <View style={styles.dataRow}>
      <Text style={styles.dataLabel}>{label}</Text>
      <Text style={styles.dataValue}>{value}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Read</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  dataLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  dataValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
    marginRight: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
