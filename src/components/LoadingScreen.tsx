import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

interface LoadingScreenProps {
  title: string;
  subtitle: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ title, subtitle }) => {
  return (
    <SafeAreaView style={[styles.container, styles.centerContent]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </SafeAreaView>
  );
};

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
});
