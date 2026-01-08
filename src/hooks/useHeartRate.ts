import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AppleHealthKit from 'react-native-health';

export const useHeartRate = () => {
  const [heartRate, setHeartRate] = useState<number>(0);

  const readHeartRate = useCallback(() => {
    const options = {
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
      limit: 1,
    };

    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read heart rate: ' + err);
        return;
      }
      if (results && results.length > 0) {
        setHeartRate(results[0].value);
        Alert.alert('Latest Heart Rate', `${results[0].value} bpm`);
      } else {
        Alert.alert('No Data', 'No heart rate data available');
      }
    });
  }, []);

  return {
    heartRate,
    readHeartRate,
  };
};
