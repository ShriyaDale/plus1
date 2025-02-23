import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Image } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

initializeApp(firebaseConfig);
const db = getFirestore();

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
  const activityImages: { [key: string]: any } = {
    'Coffee Date': require('../assets/images/coffee-date.png'),
    'Dinner Date': require('../assets/images/dinner-date.jpg'),
    'Movie Night': require('../assets/images/movie-night.jpg'),
    'Live Comedy Show': require('../assets/images/comedy-show.jpg'),
    'Concert': require('../assets/images/concert.png'),
    'Escape Room': require('../assets/images/escape-room.jpg'),
    'Hiking': require('../assets/images/hiking.png'),
    'Beach Day': require('../assets/images/beach-day.jpg'),
    'Kayaking': require('../assets/images/kayaking.jpg'),
    'Pottery Class': require('../assets/images/pottery-class.jpg'),
    'Music Jam Session': require('../assets/images/music-jam-session.jpg'),
  };
  const [rightSwipes, setRightSwipes] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Animated values for overlay animations
  const leftOverlayOpacity = useRef(new Animated.Value(0)).current;
  const rightOverlayOpacity = useRef(new Animated.Value(0)).current;

  // Ref to store current swipe direction (null until set)
  const currentSwipeDirection = useRef<string | null>(null);

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
    // Reset the current swipe direction for the next card.
    currentSwipeDirection.current = null;

    const swipedActivity = activities[cardIndex];
    if (!swipedActivity) return;

    if (direction === 'right') {
      setRightSwipes(prev => prev + 1);
    }

    // Check if this is the last card.
    if (cardIndex === activities.length - 1) {
      setShowResults(true);
      setAllCardsSwiped(true);
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

  const handleAllCardsSwiped = () => {
    setAllCardsSwiped(true);
  };

  const handleGetDateRecommendations = () => {
    navigation.navigate('View');
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
       <Image source={require('../constants/logo.png')} style={{ width: 50, height: 50 }} />
     </View> */}

      {/* Swipe instruction text positioned above the card stack */}
      {!allCardsSwiped && <Text style={styles.swipeText}>swipe</Text>}

      <Swiper
        cards={activities}
        renderCard={(card: Activity) => {
          const imageSource = activityImages[card.title];
          return (
            <View style={styles.card}>
              <ImageBackground source={imageSource} style={styles.imageBackground} resizeMode="cover">
                <View style={styles.overlay} />
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{card.title.toLowerCase()}</Text>
                  <Text style={styles.cardDescription}>{card.description.toLowerCase()}</Text>
                </View>
              </ImageBackground>
            </View>
          );
        }}
        onSwiping={(cardIndex, swipe) => {
          if (!currentSwipeDirection.current && Math.abs(swipe) > 20) {
            currentSwipeDirection.current = swipe > 0 ? 'right' : 'left';
          }
        }}
        onSwipedLeft={(cardIndex) => handleSwipe('left', cardIndex)}
        onSwipedRight={(cardIndex) => handleSwipe('right', cardIndex)}
        onSwipedAll={handleAllCardsSwiped}
        cardIndex={0}
        backgroundColor={'#ffead1'}
        stackSize={3}
        cardStyle={styles.cardStyle}
      />
  
      {!allCardsSwiped && (
        <View style={styles.iconsContainer}>
          <Text style={styles.redIcon}>✕</Text>
          <Text style={styles.greenIcon}>✓</Text>
        </View>
      )}
  
      {allCardsSwiped && (
        <ConfettiCannon 
          count={200}
          origin={{ x: SCREEN_WIDTH / 2, y: 0 }}
          autoStart={true}
          fadeOut={true}
          fallSpeed={3000}
        />
      )}
  
      {allCardsSwiped && (
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleGetDateRecommendations}
        >
          <Text style={styles.loginButtonText}>get date recommendations</Text>
        </TouchableOpacity>
      )}
     <View style={styles.footer}>
       <TouchableOpacity>
         <Image source={require('../constants/house.png')} style={{ width: 25, height: 25 }} />
       </TouchableOpacity>
       <TouchableOpacity>
         <Image source={require('../constants/eye.png')} style={{ width: 25, height: 25 }} />
       </TouchableOpacity>
       <TouchableOpacity>
         <Image source={require('../constants/profile.png')} style={{ width: 25, height: 25 }} />
       </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffead1',
    justifyContent: 'center',
    alignItems: 'center',
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
  loginButton: {
    backgroundColor: '#e6635a',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'InstrumentSans-Regular',
  },
  cardStyle: {
    marginTop: 50,
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
    color: 'white',
    textAlign: 'center',
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 80,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    zIndex: 3,
  },
  redIcon: {
    fontSize: 50,
    color: 'red',
  },
  greenIcon: {
    fontSize: 50,
    color: 'green',
  },
  swipeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    zIndex: 3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e6635a",
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,      
    width: "100%",
  },
  header: {
    backgroundColor: "#ffead1",
    padding: 20,
    alignItems: "center",
    zIndex: 3
  },
 
}); 
