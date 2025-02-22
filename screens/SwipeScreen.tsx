import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ViewScreen from './ViewScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Activity = {
  id: number;
  title: string;
  description: string;
};

type RootStackParamList = {
  View: undefined;
};

export default function SwipeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);

  const activities = [
    { id: 1, title: 'Coffee Date', description: 'Casual coffee meetup' },
    { id: 2, title: 'Movie Night', description: 'Watch a movie together' },
    { id: 3, title: 'Hiking', description: 'Outdoor adventure' },
    // Add more activities
  ];

  const handleSwipe = (direction: string, cardIndex: number) => {
    // Handle swipe logic here
    console.log(`Swiped ${direction} on card ${cardIndex}`);
  };

  const handleAllCardsSwiped = () => {
    setAllCardsSwiped(true);
  };

  const handleGetDateRecommendations = () => {
    navigation.navigate('View');
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={activities}
        renderCard={(card: Activity) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </View>
        )}
        onSwipedLeft={(cardIndex) => handleSwipe('left', cardIndex)}
        onSwipedRight={(cardIndex) => handleSwipe('right', cardIndex)}
        onSwipedAll={handleAllCardsSwiped}
        cardIndex={0}
        backgroundColor={'#F5F5F5'}
        stackSize={3}
        cardStyle={styles.cardStyle}
      />
      {allCardsSwiped && (
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleGetDateRecommendations}
        >
          <Text style={styles.loginButtonText}>get date recommendations</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#9747FF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 300,
    width: '60%',
    alignSelf: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'InstrumentSans-Regular',
  },
  cardStyle: {
    top: 50,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 