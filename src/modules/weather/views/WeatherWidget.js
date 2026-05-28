import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useWeatherViewModel } from '../viewmodels/useWeatherViewModel';

export default function WeatherWidget() {
  const { weather, loading, error, fetchWeather } = useWeatherViewModel();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weather</Text>

      {loading ? (
        <ActivityIndicator color="#007AFF" />
      ) : weather ? (
        <View>
          <Text style={styles.temperature}>{weather.temperature}°C</Text>
          <Text style={styles.condition}>{weather.condition}</Text>
          <Text style={styles.location}>{weather.location}</Text>
        </View>
      ) : (
        <Text style={styles.empty}>Weather unavailable</Text>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  condition: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  empty: {
    color: '#6B7280',
    marginTop: 6,
  },
  button: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#1D4ED8',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  errorText: {
    marginTop: 10,
    color: '#B91C1C',
  },
});
