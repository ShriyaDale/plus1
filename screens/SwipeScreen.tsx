import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SCREEN_WIDTH = Dimensions.get('window').width;

type Activity = {
  id: number;
  title: string;
  description: string;
};

export default function SwipeScreen() {
  const activities = [
    // Food & Drinks
    { id: 1, title: 'Coffee Date', description: 'Casual coffee meetup' },
    { id: 2, title: 'Brunch', description: 'Enjoy a relaxed morning meal together' },
    { id: 3, title: 'Dinner Date', description: 'Go to a nice restaurant' },
    { id: 4, title: 'Food Truck Tour', description: 'Try different food trucks' },
    { id: 5, title: 'Picnic in the Park', description: 'Bring homemade food and relax outdoors' },
    { id: 6, title: 'Dessert Tasting', description: 'Visit a bakery or try different sweets' },
    { id: 7, title: 'Wine Tasting', description: 'Sample wines at a local vineyard' },
    { id: 8, title: 'Cooking Class', description: 'Learn to cook a new dish together' },
    { id: 9, title: 'Brewery Tour', description: 'Try local craft beers' },
    { id: 10, title: 'Ice Cream Date', description: 'Enjoy a variety of flavors' },
  
    // Entertainment & Culture
    { id: 11, title: 'Movie Night', description: 'Watch a movie together' },
    { id: 12, title: 'Live Comedy Show', description: 'Laugh together at a comedy club' },
    { id: 13, title: 'Concert', description: 'See a live music performance' },
    { id: 14, title: 'Theater Play', description: 'Enjoy a stage performance' },
    { id: 15, title: 'Art Gallery Visit', description: 'Explore artwork and exhibitions' },
    { id: 16, title: 'Museum Visit', description: 'Learn about history or science together' },
    { id: 17, title: 'Escape Room', description: 'Solve puzzles to escape within a time limit' },
    { id: 18, title: 'Board Game Cafe', description: 'Play board games over drinks' },
    { id: 19, title: 'Karaoke Night', description: 'Sing your heart out' },
    { id: 20, title: 'Trivia Night', description: 'Compete in a fun trivia contest' },
  
    // Outdoor Adventures
    { id: 21, title: 'Hiking', description: 'Outdoor adventure' },
    { id: 22, title: 'Bike Ride', description: 'Explore the city or trails on bikes' },
    { id: 23, title: 'Beach Day', description: 'Relax by the water or play beach sports' },
    { id: 24, title: 'Kayaking', description: 'Paddle through lakes or rivers' },
    { id: 25, title: 'Stargazing', description: 'Enjoy the night sky with a telescope' },
    { id: 26, title: 'Amusement Park', description: 'Thrill rides and fun games' },
    { id: 27, title: 'Botanical Garden Visit', description: 'Walk through beautiful gardens' },
    { id: 28, title: 'Zoo or Aquarium', description: 'See animals and marine life' },
    { id: 29, title: 'Hot Air Balloon Ride', description: 'Romantic and scenic adventure' },
    { id: 30, title: 'Horseback Riding', description: 'Enjoy a peaceful trail ride' },
  
    // Creative & Interactive
    { id: 31, title: 'Pottery Class', description: 'Create something together' },
    { id: 32, title: 'Painting & Wine', description: 'Paint while sipping wine' },
    { id: 33, title: 'Photography Walk', description: 'Capture cool spots in the city' },
    { id: 34, title: 'DIY Craft Night', description: 'Get creative with hands-on projects' },
    { id: 35, title: 'Music Jam Session', description: 'Play instruments or sing together' },
    { id: 36, title: 'Dance Class', description: 'Learn salsa, tango, or hip-hop' },
    { id: 37, title: 'Poetry Reading', description: 'Attend or perform at an open mic night' },
    { id: 38, title: 'Lego Building Challenge', description: 'Build fun structures together' },
    { id: 39, title: 'Write a Story Together', description: 'Create a fun short story' },
    { id: 40, title: 'Fashion Thrift Challenge', description: 'Find cool outfits on a budget' },
  
    // Fun & Play
    { id: 41, title: 'Mini Golf', description: 'Play a round of mini-golf' },
    { id: 42, title: 'Bowling', description: 'Compete for the highest score' },
    { id: 43, title: 'Go-Kart Racing', description: 'Race against each other' },
    { id: 44, title: 'Laser Tag', description: 'Battle it out in an arena' },
    { id: 45, title: 'Arcade Night', description: 'Play classic and modern arcade games' },
    { id: 46, title: 'Trampoline Park', description: 'Bounce around and do flips' },
    { id: 47, title: 'VR Gaming', description: 'Experience virtual reality games' },
    { id: 48, title: 'Roller Skating', description: 'Glide around the rink' },
    { id: 49, title: 'Rock Climbing', description: 'Challenge yourself on an indoor wall' },
    { id: 50, title: 'Axe Throwing', description: 'Throw axes at a target' },
  
    // Chill & Relaxed
    { id: 51, title: 'Sunset Walk', description: 'Enjoy an evening stroll' },
    { id: 52, title: 'Library or Bookstore Date', description: 'Browse books together' },
    { id: 53, title: 'Bubble Tea Hangout', description: 'Sip on fun-flavored boba' },
    { id: 54, title: 'Spa Day', description: 'Relax with a massage or sauna' },
    { id: 55, title: 'Listening to Vinyl Records', description: 'Chill with classic music' },
    { id: 56, title: 'Meditation or Yoga Session', description: 'Relax and find inner peace' },
    { id: 57, title: 'Home Movie Night', description: 'Set up a cozy movie at home' },
    { id: 58, title: 'Puzzle Night', description: 'Solve a big puzzle together' },
    { id: 59, title: 'Tea Tasting', description: 'Try exotic teas from around the world' },
    { id: 60, title: 'Cloud Watching', description: 'Lay back and watch the clouds pass by' }
  ];
  
  

  const handleSwipe = async (direction: string, cardIndex: number) => {

    console.log(`Swiped ${direction} on card ${cardIndex}`);

    const swipedActivity = activities[cardIndex];

    if (!swipedActivity) return;

    const storageKey = direction === 'right' ? 'yes_swipes' : 'no_swipes';

    try {
      const existingData = await AsyncStorage.getItem(storageKey);
      const updatedData = existingData ? JSON.parse(existingData) : [];

      updatedData.push(swipedActivity);

      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedData));

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