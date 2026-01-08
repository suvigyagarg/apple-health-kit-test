import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AppleHealthKit from 'react-native-health';

export const useDistance = () => {
  const [distance, setDistance] = useState<number>(0);

  const readDistance = useCallback(() => {
    const options = {
      date: new Date().toISOString(),
      includeManuallyAdded: true,
    };

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read distance: ' + err);
        return;
      }
      setDistance(results.value);
      Alert.alert('Distance Today', `${results.value.toFixed(2)} meters`);
    });
  }, []);

  const writeDistance = useCallback((distanceValue: string) => {
    if (!distanceValue) {
      Alert.alert('Error', 'Please enter distance value');
      return;
    }

    const options = {
      value: parseFloat(distanceValue),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.saveWalkingRunningDistance(options, (err) => {
      if (err) {
        Alert.alert('Error', 'Failed to save distance: ' + err);
        return;
      }
      Alert.alert('Success', `Saved ${distanceValue} meters`);
      readDistance();
    });
  }, [readDistance]);

  return {
    distance,
    readDistance,
    writeDistance,
  };
};
