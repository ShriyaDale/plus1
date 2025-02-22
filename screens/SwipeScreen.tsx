import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Activity = {
  id: number;
  title: string;
  description: string;
};

export default function SwipeScreen() {
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
        cardIndex={0}
        backgroundColor={'#F5F5F5'}
        stackSize={3}
        cardStyle={styles.cardStyle}
      />
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
}); 