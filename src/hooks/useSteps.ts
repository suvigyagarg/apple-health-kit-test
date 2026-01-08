import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AppleHealthKit from 'react-native-health';

export const useSteps = () => {
  const [stepCount, setStepCount] = useState<number>(0);

  const readSteps = useCallback(() => {
    const options = {
      date: new Date().toISOString(),
      includeManuallyAdded: true,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read steps: ' + err);
        return;
      }
      setStepCount(results.value);
      Alert.alert('Steps Today', `${results.value} steps`);
    });
  }, []);

  const writeSteps = useCallback((steps: string) => {
    if (!steps) {
      Alert.alert('Error', 'Please enter steps value');
      return;
    }

    const options = {
      value: parseFloat(steps),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.saveSteps(options, (err) => {
      if (err) {
        Alert.alert('Error', 'Failed to save steps: ' + err);
        return;
      }
      Alert.alert('Success', `Saved ${steps} steps`);
      readSteps();
    });
  }, [readSteps]);

  return {
    stepCount,
    readSteps,
    writeSteps,
  };
};
