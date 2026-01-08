import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WriteDataRow } from './WriteDataRow';
import { useSteps } from '../hooks/useSteps';
import { useDistance } from '../hooks/useDistance';
import { useWeight } from '../hooks/useWeight';

export const WriteDataSection: React.FC = () => {
  const { writeSteps } = useSteps();
  const { writeDistance } = useDistance();
  const { writeWeight } = useWeight();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>✍️ Write Health Data</Text>

      <WriteDataRow
        label="Weight (kg):"
        placeholder="70.5"
        keyboardType="decimal-pad"
        onSave={writeWeight}
      />

      <WriteDataRow
        label="Steps:"
        placeholder="1000"
        keyboardType="number-pad"
        onSave={writeSteps}
      />

      <WriteDataRow
        label="Distance (m):"
        placeholder="500"
        keyboardType="decimal-pad"
        onSave={writeDistance}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
});
