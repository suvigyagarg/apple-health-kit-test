import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AppleHealthKit from 'react-native-health';

export const useHeight = () => {
  const [height, setHeight] = useState<number>(0);

  const readHeight = useCallback(() => {
    AppleHealthKit.getLatestHeight({}, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read height: ' + err);
        return;
      }
      setHeight(results.value);
      Alert.alert('Latest Height', `${results.value} cm`);
    });
  }, []);

  return {
    height,
    readHeight,
  };
};
