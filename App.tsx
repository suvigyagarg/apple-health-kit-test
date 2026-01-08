/**
 * HealthKit App - Read and Write Health Data
 * Uses react-native-health to interact with Apple HealthKit
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import { useHealthKit } from './src/hooks/useHealthKit';
import { ReadDataSection } from './src/components/ReadDataSection';
import { WriteDataSection } from './src/components/WriteDataSection';
import { LoadingScreen } from './src/components/LoadingScreen';
import { InfoBox } from './src/components/InfoBox';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { isHealthKitAvailable, authorized } = useHealthKit();

  if (!isHealthKitAvailable) {
    return (
      <LoadingScreen
        title="HealthKit not available on this platform"
        subtitle="This app requires iOS with HealthKit"
      />
    );
  }

  if (!authorized) {
    return (
      <LoadingScreen
        title="Initializing HealthKit..."
        subtitle="Please grant permissions when prompted"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>🏥 HealthKit App</Text>
        
        <ReadDataSection />
        <WriteDataSection />
        <InfoBox />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});

export default App;

    });
  };

  const readTodayDistance = () => {
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
  };

  const readLatestHeartRate = () => {
    AppleHealthKit.getHeartRateSamples({}, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read heart rate: ' + err);
        return;
      }
      setHeartRate(results.values[0].value);
      Alert.alert('Latest Heart Rate', `${results.values[0].value} bpm`);
    });
  };

  const readLatestWeight = () => {
    AppleHealthKit.getLatestWeight({}, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read weight: ' + err);
        return;
      }
      setWeight(results.value);
      Alert.alert('Latest Weight', `${results.value} kg`);
    });
  };

  const readLatestHeight = () => {
    AppleHealthKit.getLatestHeight({}, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to read height: ' + err);
        return;
      }
      setHeight(results.value);
      Alert.alert('Latest Height', `${results.value} cm`);
    });
  };

  const writeWeight = () => {
    if (!newWeight) {
      Alert.alert('Error', 'Please enter a weight value');
      return;
    }

    const options = {
      value: parseFloat(newWeight),
      date: new Date().toISOString(),
    };

    AppleHealthKit.saveWeight(options, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to save weight: ' + err);
        return;
      }
      Alert.alert('Success', `Saved weight: ${newWeight} kg`);
      setNewWeight('');
      readLatestWeight();
    });
  };

  const writeSteps = () => {
    if (!newSteps) {
      Alert.alert('Error', 'Please enter steps value');
      return;
    }

    const options = {
      value: parseFloat(newSteps),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.saveSteps(options, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to save steps: ' + err);
        return;
      }
      Alert.alert('Success', `Saved ${newSteps} steps`);
      setNewSteps('');
      readTodaySteps();
    });
  };

  const writeDistance = () => {
    if (!newDistance) {
      Alert.alert('Error', 'Please enter distance value');
      return;
    }

    const options = {
      value: parseFloat(newDistance),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.saveWalkingRunningDistance(options, (err, results) => {
      if (err) {
        Alert.alert('Error', 'Failed to save distance: ' + err);
        return;
      }
      Alert.alert('Success', `Saved ${newDistance} meters`);
      setNewDistance('');
      readTodayDistance();
    });
  };

  if (!isHealthKitAvailable) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.title}>HealthKit not available on this platform</Text>
        <Text style={styles.subtitle}>This app requires iOS with HealthKit</Text>
      </SafeAreaView>
    );
  }

  if (!authorized) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.title}>Initializing HealthKit...</Text>
        <Text style={styles.subtitle}>Please grant permissions when prompted</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>🏥 HealthKit App</Text>

        {/* Read Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Read Health Data</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Steps Today:</Text>
            <Text style={styles.dataValue}>{stepCount}</Text>
            <TouchableOpacity style={styles.button} onPress={readTodaySteps}>
              <Text style={styles.buttonText}>Read</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Distance Today:</Text>
            <Text style={styles.dataValue}>{distance.toFixed(2)} m</Text>
            <TouchableOpacity style={styles.button} onPress={readTodayDistance}>
              <Text style={styles.buttonText}>Read</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Heart Rate:</Text>
            <Text style={styles.dataValue}>{heartRate} bpm</Text>
            <TouchableOpacity style={styles.button} onPress={readLatestHeartRate}>
              <Text style={styles.buttonText}>Read</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Weight:</Text>
            <Text style={styles.dataValue}>{weight} kg</Text>
            <TouchableOpacity style={styles.button} onPress={readLatestWeight}>
              <Text style={styles.buttonText}>Read</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Height:</Text>
            <Text style={styles.dataValue}>{height} cm</Text>
            <TouchableOpacity style={styles.button} onPress={readLatestHeight}>
              <Text style={styles.buttonText}>Read</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Write Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Write Health Data</Text>

          <View style={styles.writeRow}>
            <Text style={styles.inputLabel}>Weight (kg):</Text>
            <TextInput
              style={styles.input}
              value={newWeight}
              onChangeText={setNewWeight}
              placeholder="70.5"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={writeWeight}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.writeRow}>
            <Text style={styles.inputLabel}>Steps:</Text>
            <TextInput
              style={styles.input}
              value={newSteps}
              onChangeText={setNewSteps}
              placeholder="1000"
              keyboardType="number-pad"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={writeSteps}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.writeRow}>
            <Text style={styles.inputLabel}>Distance (m):</Text>
            <TextInput
              style={styles.input}
              value={newDistance}
              onChangeText={setNewDistance}
              placeholder="500"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={writeDistance}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Tip: Make sure HealthKit capability is enabled in Xcode and you've granted the necessary permissions in Settings.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
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
  writeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    width: 100,
    fontSize: 16,
    color: '#666',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
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
  infoBox: {
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#0066CC',
    lineHeight: 20,
  },
});

export default App;
