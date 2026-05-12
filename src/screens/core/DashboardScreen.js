import React from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAuthViewModel,
  useDashboardViewModel,
  useNotificationViewModel,
  useWeatherViewModel,
} from '../../viewmodels';

export default function DashboardScreen() {
  const { user, handleLogout } = useAuthViewModel();
  const { totalEvents, totalBookings, upcomingEvents, stats } = useDashboardViewModel();
  const { weather, loading, error: weatherError, fetchWeather } = useWeatherViewModel();
  const {
    enabled,
    lastNotification,
    error: notificationError,
    toggleNotifications,
    simulateEventReminder,
  } = useNotificationViewModel();

  const handleReminderPress = () => {
    const notification = simulateEventReminder(upcomingEvents[0]);

    if (notification) {
      Alert.alert(notification.title, notification.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          {user && (
            <Text style={styles.subtitle}>
              Welcome, {user.name}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalEvents}</Text>
          <Text style={styles.statLabel}>Total events</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalBookings}</Text>
          <Text style={styles.statLabel}>Total bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.confirmedBookings}</Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.pendingBookings}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weather</Text>
          <TouchableOpacity onPress={fetchWeather}>
            <Text style={styles.linkText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator color="#007AFF" />
        ) : (
          <View>
            <Text style={styles.weatherText}>
              {weather ? `${weather.temperature}°C · ${weather.condition}` : 'Weather unavailable'}
            </Text>
            {weather && <Text style={styles.mutedText}>{weather.location}</Text>}
            {weatherError && <Text style={styles.errorText}>{weatherError}</Text>}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Switch value={enabled} onValueChange={toggleNotifications} />
        </View>
        <Text style={styles.mutedText}>
          {enabled ? 'Event reminders are enabled.' : 'Event reminders are disabled.'}
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleReminderPress}>
          <Text style={styles.primaryButtonText}>Simulate Event Reminder</Text>
        </TouchableOpacity>
        {lastNotification && (
          <Text style={styles.mutedText}>Last reminder: {lastNotification.message}</Text>
        )}
        {notificationError && <Text style={styles.errorText}>{notificationError}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {upcomingEvents.length === 0 ? (
          <Text style={styles.mutedText}>No upcoming events.</Text>
        ) : (
          upcomingEvents.map((event) => (
            <View key={event.id} style={styles.eventRow}>
              <View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.mutedText}>
                  {event.date} · {event.time}
                </Text>
              </View>
              <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#6B7280',
  },
  logoutButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  logoutText: {
    color: '#111827',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    marginTop: 4,
    color: '#6B7280',
  },
  section: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  weatherText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  mutedText: {
    marginTop: 4,
    color: '#6B7280',
  },
  errorText: {
    marginTop: 8,
    color: '#B91C1C',
  },
  primaryButton: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 8,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  eventRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  eventLocation: {
    marginTop: 4,
    color: '#374151',
  },
});
