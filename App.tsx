import 'react-native-gesture-handler';  // This must be the first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import IntentScreen from './screens/IntentScreen';
import ProfileFormScreen from './screens/ProfileFormScreen';
import SwipeScreen from './screens/SwipeScreen';
import LandingPage from './screens/LandingPage';

// Define the type for route parameters
export type RootStackParamList = {
  Landing: undefined;
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
          initialRouteName="Landing"
        >
          <Stack.Screen 
            name="Landing" 
            component={LandingPage}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
          />
          <Stack.Screen 
            name="Intent" 
            component={IntentScreen}
          />
          <Stack.Screen 
            name="ProfileForm" 
            component={ProfileFormScreen}
          />
          <Stack.Screen 
            name="Swipe" 
            component={SwipeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}