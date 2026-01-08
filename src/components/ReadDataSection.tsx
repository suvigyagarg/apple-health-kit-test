import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataRow } from './DataRow';
import { useSteps } from '../hooks/useSteps';
import { useDistance } from '../hooks/useDistance';
import { useHeartRate } from '../hooks/useHeartRate';
import { useWeight } from '../hooks/useWeight';
import { useHeight } from '../hooks/useHeight';

export const ReadDataSection: React.FC = () => {
  const { stepCount, readSteps } = useSteps();
  const { distance, readDistance } = useDistance();
  const { heartRate, readHeartRate } = useHeartRate();
  const { weight, readWeight } = useWeight();
  const { height, readHeight } = useHeight();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📖 Read Health Data</Text>
      
      <DataRow
        label="Steps Today:"
        value={`${stepCount}`}
        onPress={readSteps}
      />

      <DataRow
        label="Distance Today:"
        value={`${distance.toFixed(2)} m`}
        onPress={readDistance}
      />

      <DataRow
        label="Heart Rate:"
        value={`${heartRate} bpm`}
        onPress={readHeartRate}
      />

      <DataRow
        label="Weight:"
        value={`${weight} kg`}
        onPress={readWeight}
      />

      <DataRow
        label="Height:"
        value={`${height} cm`}
        onPress={readHeight}
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
