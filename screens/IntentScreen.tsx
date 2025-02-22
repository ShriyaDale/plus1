import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type IntentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Intent'>;
};

export default function IntentScreen({ navigation }: IntentScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you looking for?</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ProfileForm', { type: 'friend' })}
      >
        <Text style={styles.buttonText}>Find Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ProfileForm', { type: 'partner' })}
      >
        <Text style={styles.buttonText}>Find Partner</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 