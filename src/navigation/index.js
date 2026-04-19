import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
import { LoginScreen, SignupScreen } from '../screens/auth';
import { HomeScreen, EventsScreen, BookingsScreen, DashboardScreen } from '../screens/core';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Events" component={EventsScreen} />
      <MainTab.Screen name="Bookings" component={BookingsScreen} />
      <MainTab.Screen name="Dashboard" component={DashboardScreen} />
    </MainTab.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
