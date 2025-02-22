import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { generateDateRecommendations } from '../utils/generateDatePlan';


const SCREEN_WIDTH = Dimensions.get('window').width;

initializeApp(firebaseConfig);
const db = getFirestore();

type Activity = {
  id: number;
  title: string;
  description: string;
};

// Add this global array before the SwipeScreen component
export const rightSwipedActivities: Activity[] = [];

export default function SwipeScreen() {
  const activities = [
    { id: 1, title: 'Coffee Date', description: 'Casual coffee meetup' },
    { id: 2, title: 'Dinner Date', description: 'Go to a nice restaurant' },  
    { id: 3, title: 'Movie Night', description: 'Watch a movie together' },
    { id: 4, title: 'Live Comedy Show', description: 'Laugh together at a comedy club' },
    { id: 5, title: 'Concert', description: 'See a live music performance' },
    { id: 6, title: 'Escape Room', description: 'Solve puzzles to escape within a time limit' },
    { id: 7, title: 'Hiking', description: 'Outdoor adventure' },
    { id: 8, title: 'Beach Day', description: 'Relax by the water or play beach sports' },
    { id: 9, title: 'Kayaking', description: 'Paddle through lakes or rivers' },
    { id: 10, title: 'Pottery Class', description: 'Create something together' },
    { id: 11, title: 'Music Jam Session', description: 'Play instruments or sing together' },
  ];
  
  const handleSwipe = async (direction: string, cardIndex: number) => {
    const swipedActivity = activities[cardIndex];
    if (!swipedActivity) return;

    try {
      await addDoc(collection(db, 'swipes'), {
        activityId: swipedActivity.id,
        title: swipedActivity.title,
        description: swipedActivity.description,
        direction: direction,
        timestamp: new Date(),
      }); 
      
      if (direction === 'right') {
        rightSwipedActivities.push(swipedActivity);
        console.log('Updated right swipes array:', rightSwipedActivities);
        // Generate new recommendations after each right swipe
        await generateDateRecommendations();
      }
      
      console.log(`Swiped ${direction} on:`, swipedActivity);
    } catch (error) {
      console.error('Error saving swipe data:', error);
    }
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
    backgroundColor: '#D8C1EB',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)', 
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
  },
}); 