import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';


const SCREEN_WIDTH = Dimensions.get('window').width;

initializeApp(firebaseConfig);
const db = getFirestore();


type Activity = {
  id: number;
  title: string;
  description: string;
};

export default function SwipeScreen() {
  const [rightSwipes, setRightSwipes] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);
  
  const activities = [
    // Food & Drinks
    { id: 1, title: 'Coffee Date', description: 'Casual coffee meetup' },
    { id: 2, title: 'Dinner Date', description: 'Go to a nice restaurant' },  
    // Entertainment & Culture
    { id: 3, title: 'Movie Night', description: 'Watch a movie together' },
    { id: 4, title: 'Live Comedy Show', description: 'Laugh together at a comedy club' },
    { id: 5, title: 'Concert', description: 'See a live music performance' },
    { id: 6, title: 'Escape Room', description: 'Solve puzzles to escape within a time limit' },
    // Outdoor Adventures
    { id: 7, title: 'Hiking', description: 'Outdoor adventure' },
    { id: 8, title: 'Beach Day', description: 'Relax by the water or play beach sports' },
    { id: 9, title: 'Kayaking', description: 'Paddle through lakes or rivers' },
    // Creative & Interactive
    { id: 10, title: 'Pottery Class', description: 'Create something together' },
    { id: 11, title: 'Music Jam Session', description: 'Play instruments or sing together' },
  ];
  
  const handleSwipe = async (direction: string, cardIndex: number) => {
    const swipedActivity = activities[cardIndex];
    if (!swipedActivity) return;

    if (direction === 'right') {
      setRightSwipes(prev => prev + 1);
    }

    // Check if this is the last card
    if (cardIndex === activities.length - 1) {
      setShowResults(true);
    }

    try {
      await addDoc(collection(db, 'swipes'), {
        activityId: swipedActivity.id,
        title: swipedActivity.title,
        description: swipedActivity.description,
        direction: direction,
        timestamp: new Date(),
      });
      console.log(`Swiped ${direction} on:`, swipedActivity);
    } catch (error) {
      console.error('Error saving swipe data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!showResults ? (
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
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            You liked {rightSwipes} activities!
          </Text>
        </View>
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
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
}); 