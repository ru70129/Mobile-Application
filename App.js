import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/modules/auth/views/AuthNavigator';
import DashboardTabs from './src/modules/dashboard/views/DashboardTabs';
import { useAuthStore } from './src/common/store/authStore';

export default function App() {
  const { initializeAuth } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Initialize authentication
    initializeAuth();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        {user ? <DashboardTabs /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
