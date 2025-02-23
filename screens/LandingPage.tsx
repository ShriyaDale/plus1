import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Image } from 'expo-image';
import landingImage from '../assets/images/city-image.png'; 
import logo from '../constants/landing-page-logo.png';

type LandingPageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Landing'>;
};

export default function LandingPage({ navigation }: LandingPageProps) {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'find your';
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const buttonOpacity = new Animated.Value(0);
  
  const handleGetStarted = () => {
    navigation.navigate('Login'); 
  };


  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1)); // Use slice to avoid undefined
        index++;
      } else {
        clearInterval(typingInterval);
  
        Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }).start(() => {
            Animated.timing(buttonOpacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }).start();
          });
        }
      }, 150);
  
    
    return () => clearInterval(typingInterval);
  }, []);


  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      
      {/* Typing Text */}
      <Text style={styles.introText}>{displayedText}</Text>

      {/* Animated Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image source={logo} style={styles.logo} />
      </Animated.View>

      {/* Button */}
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedButtonText}>get started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  logo: {
    width: 330,
    height: 220,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    top: '27%', 
    alignItems: 'center',
    padding: 5,
  },
  getStartedButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  getStartedButtonText: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  introText: {
    position: 'absolute',
    top: '25%', 
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',    
  }
});
