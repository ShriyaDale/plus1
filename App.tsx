import 'react-native-gesture-handler';  // This must be the first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import IntentScreen from './screens/IntentScreen';
import ProfileFormScreen from './screens/ProfileFormScreen';
import SwipeScreen from './screens/SwipeScreen';

// Define the type for route parameters
export type RootStackParamList = {
  Login: undefined;
  Intent: undefined;
  ProfileForm: { type: 'friend' | 'partner' };
  Swipe: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen 
            name="Intent" 
            component={IntentScreen}
            options={{ title: 'Choose Your Intent' }}
          />
          <Stack.Screen 
            name="ProfileForm" 
            component={ProfileFormScreen}
            options={{ title: 'Create Profile' }}
          />
          <Stack.Screen 
            name="Swipe" 
            component={SwipeScreen}
            options={{ title: 'Find Activities' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}