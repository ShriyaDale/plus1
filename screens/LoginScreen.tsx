import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import logo from '../constants/';
import { Image } from 'expo-image';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add authentication logic here
    navigation.navigate('Intent');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={logo} style={{ width: 146, height: 85 }} />
        <Text style={styles.title}>login or signup</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}> 
              {/* fix this */}
            <Text style={styles.signupText}>sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffead1',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: '20%', // This will push content to start from top 20% of screen
  },
  title: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
    color: '#e6635a', 
    fontFamily: 'InstrumentSans-Regular',
  },
  formContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    paddingHorizontal: 5,
    fontFamily: 'InstrumentSans-Regular',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#e6635a',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'InstrumentSans-Regular',
  },
  signupText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
    fontFamily: 'InstrumentSans-Regular',
  },
}); 