import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDashboardViewModel } from '../viewmodels/useDashboardViewModel';
import WeatherWidget from '../../weather/views/WeatherWidget';

export default function HomeScreen() {
  // preserve original centered home content by placing it in an inner view
  const { totalEvents, totalBookings, upcomingEvents } = useDashboardViewModel();

  return (
    <View style={styles.root}>
      {/* Original Home content preserved */}
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
      </View>

      {/* Dashboard widgets appended below original content */}
      <ScrollView contentContainerStyle={styles.appended}>
        <View style={styles.analyticsRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{totalEvents}</Text>
            <Text style={styles.cardLabel}>Events</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{totalBookings}</Text>
            <Text style={styles.cardLabel}>Bookings</Text>
          </View>
        </View>

        <WeatherWidget />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.length === 0 ? (
            <Text style={styles.mutedText}>No upcoming events.</Text>
          ) : (
            upcomingEvents.map((ev) => (
              <View key={ev.id} style={styles.eventRow}>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.mutedText}>{ev.date} · {ev.time}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // kept original container styles under `container` to preserve layout
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  appended: {
    padding: 20,
    backgroundColor: '#fff',
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  cardLabel: {
    marginTop: 6,
    color: '#6B7280',
  },
  section: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: '600',
  },
  mutedText: {
    marginTop: 4,
    color: '#6B7280',
  },
  errorText: {
    marginTop: 6,
    color: '#B91C1C',
  },
  eventRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
