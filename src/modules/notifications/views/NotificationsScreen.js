import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNotificationViewModel } from '../viewmodels/useNotificationViewModel';

export default function NotificationsScreen() {
  const {
    enabled,
    lastNotification,
    error,
    toggleNotifications,
    simulateEventReminder,
  } = useNotificationViewModel();

  const sampleEvent = {
    title: 'Community Meetup',
    date: '2026-06-01',
    time: '18:00',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Manage reminders and demo notifications.</Text>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Reminder status</Text>
        <Text style={styles.statusText}>{enabled ? 'Enabled' : 'Disabled'}</Text>
        <TouchableOpacity style={styles.button} onPress={toggleNotifications}>
          <Text style={styles.buttonText}>{enabled ? 'Disable reminders' : 'Enable reminders'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Simulate reminder</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => simulateEventReminder(sampleEvent)}
        >
          <Text style={styles.buttonText}>Send sample reminder</Text>
        </TouchableOpacity>

        {lastNotification ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>{lastNotification.title}</Text>
            <Text style={styles.resultText}>{lastNotification.message}</Text>
          </View>
        ) : null}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 20,
  },
  panel: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  resultBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
  },
  resultTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  resultText: {
    color: '#1E3A8A',
  },
  errorText: {
    marginTop: 10,
    color: '#B91C1C',
  },
});
