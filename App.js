import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Navigation from './src/navigation/AppNavigator';
import { useAuthStore } from './src/common/store/authStore';

export default function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize authentication
    initializeAuth();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </SafeAreaView>
  );
}
