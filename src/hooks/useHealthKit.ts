import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.BodyMassIndex,
    ],
    write: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
  },
};

export const useHealthKit = () => {
  const [isHealthKitAvailable, setIsHealthKitAvailable] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setIsHealthKitAvailable(true);
      initializeHealthKit();
    } else {
      Alert.alert('iOS Required', 'HealthKit is only available on iOS devices');
    }
  }, []);

  const initializeHealthKit = () => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!', error);
        Alert.alert('Error', 'Failed to initialize HealthKit: ' + error);
      } else {
        setAuthorized(true);
        console.log('HealthKit initialized successfully');
      }
    });
  };

  return {
    isHealthKitAvailable,
    authorized,
  };
};
