import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AppleHealthKit from 'react-native-health';

export const useWeight = () => {
  const [weight, setWeight] = useState<number>(0);

  const readWeight = useCallback(() => {
    AppleHealthKit.getLatestWeight({}, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read weight: ' + err);
        return;
      }
      setWeight(results.value);
      Alert.alert('Latest Weight', `${results.value} kg`);
    });
  }, []);

  const writeWeight = useCallback((weightValue: string) => {
    if (!weightValue) {
      Alert.alert('Error', 'Please enter a weight value');
      return;
    }

    const options = {
      value: parseFloat(weightValue),
      date: new Date().toISOString(),
    };

    AppleHealthKit.saveWeight(options, (err) => {
      if (err) {
        Alert.alert('Error', 'Failed to save weight: ' + err);
        return;
      }
      Alert.alert('Success', `Saved weight: ${weightValue} kg`);
      readWeight();
    });
  }, [readWeight]);

  return {
    weight,
    readWeight,
    writeWeight,
  };
};
