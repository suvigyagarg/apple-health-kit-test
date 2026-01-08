import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const InfoBox: React.FC = () => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>
        💡 Tip: Make sure HealthKit capability is enabled in Xcode and you've granted the necessary permissions in Settings.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
