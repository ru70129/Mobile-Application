import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthViewModel } from '../../viewmodels';

export default function DashboardScreen() {
  const { user, handleLogout } = useAuthViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar} />
        <Text style={styles.name}>{user ? user.name : 'Guest'}</Text>
        <Text style={styles.email}>{user ? user.email : 'user@example.com'}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '90%',
    padding: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    color: '#6B7280',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
  },
});
