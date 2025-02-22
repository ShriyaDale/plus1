import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type ProfileFormScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileForm'>;
  route: RouteProp<RootStackParamList, 'ProfileForm'>;
};

export default function ProfileFormScreen({ navigation, route }: ProfileFormScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    orientation: '',
  });
  
  // Add swipe counter state
  const [swipeCount, setSwipeCount] = useState(0);

  // Add useEffect to watch swipe count
  useEffect(() => {
    if (swipeCount >= 10) {
      const userId = 'current-user-id'; // Replace with actual user ID
      getRightSwipes(userId).then(swipes => {
        console.log('After 10 swipes, right swipes data:', swipes);
        setSwipeCount(0); // Reset counter after checking
      });
    }
  }, [swipeCount]);

  // Add function to handle swipes
  const handleSwipe = (direction: string) => {
    setSwipeCount(prev => prev + 1);
    // Your existing swipe logic here
  };

  const getRightSwipes = async (userId: string) => {
    try {
      const swipesRef = collection(db, 'swipes');
      const q = query(
        swipesRef,
        where('userId', '==', userId),
        where('direction', '==', 'right')
      );

      const querySnapshot = await getDocs(q);
      const rightSwipes: { [key: string]: any } = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        rightSwipes[doc.id] = {
          swipedUserId: data.swipedUserId,
          timestamp: data.timestamp,
        };
      });

      console.log('Right swipes:', rightSwipes);
      return rightSwipes;
    } catch (error) {
      console.error('Error getting right swipes:', error);
      return {};
    }
  };

  const handleSubmit = async () => {
    // Add form validation and submission logic here
    const userId = 'current-user-id'; // Replace with actual user ID
    const rightSwipes = await getRightSwipes(userId);
    navigation.navigate('Swipe');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={formData.age}
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Non-binary" value="non-binary" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.orientation}
          onValueChange={(value) => setFormData({ ...formData, orientation: value })}
        >
          <Picker.Item label="Select Orientation" value="" />
          <Picker.Item label="Straight" value="straight" />
          <Picker.Item label="Gay" value="gay" />
          <Picker.Item label="Bisexual" value="bisexual" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 