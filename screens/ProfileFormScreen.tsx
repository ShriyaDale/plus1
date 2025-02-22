import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
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
    <ScrollView 
      style={styles.scrollView}
      showsVerticalScrollIndicator={true}
      indicatorStyle="white"
    >
      <View style={styles.container}>
        <Text style={styles.title}>pre-match questions:</Text>
        <Text style={styles.text}>preferred partner age range:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            style={{ color: '#4B0082' }}
          >
            <Picker.Item label="age range" value="" color="#4B0082" />
            <Picker.Item label="18 - 24" value="teen" color="#4B0082" />
            <Picker.Item label="25 - 34" value="twenties" color="#4B0082" />
            <Picker.Item label="35 - 44" value="mid age" color="#4B0082" />
            <Picker.Item label="45 - 60" value="old" color="#4B0082" />
            <Picker.Item label="60+" value="mid age" color="#4B0082" />
            <Picker.Item label="other" value="other" color="#4B0082" />
          </Picker>
        </View>
        <Text style={styles.text}>your gender:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            style={{ color: '#4B0082' }}
          >
            <Picker.Item label="select gender" value="" color="#4B0082" />
            <Picker.Item label="male" value="male" color="#4B0082" />
            <Picker.Item label="female" value="female" color="#4B0082" />
            <Picker.Item label="non-binary" value="non-binary" color="#4B0082" />
            <Picker.Item label="other" value="other" color="#4B0082" />
          </Picker>
        </View>
        <Text style={styles.text}>your sexual orientation:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.orientation}
            onValueChange={(value) => setFormData({ ...formData, orientation: value })}
            style={{ color: '#4B0082' }}
          >
            <Picker.Item label="select orientation" value="" color="#4B0082" />
            <Picker.Item label="straight" value="straight" color="#4B0082" />
            <Picker.Item label="gay" value="gay" color="#4B0082" />
            <Picker.Item label="bisexual" value="bisexual" color="#4B0082" />
            <Picker.Item label="other" value="other" color="#4B0082" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FAF5FF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF5FF',
  },
  input: {
    height: 50,
    backgroundColor: '#E9D5FF',
    color: '#4B0082',
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 0,
    fontFamily: 'InstrumentSans-Regular',
  },
  pickerContainer: {
    backgroundColor: '#E9D5FF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#9747FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'InstrumentSans-Regular',
  },
  text:{
    color: '#652f90ff',
    fontSize: 20,
    fontFamily: 'InstrumentSans-Regular',
    marginBottom: 20,
  },
  title:{
    color: '#652f90ff',
    fontSize: 30,
    fontFamily: 'InstrumentSans-Regular',
    marginBottom: 20,
    alignSelf: 'center',
  }
}); 