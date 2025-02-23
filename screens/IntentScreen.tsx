import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type IntentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Intent'>;
};

export default function IntentScreen({ navigation }: IntentScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>match with...</Text>

      <View style={styles.imageBackground}>
        <View style={styles.imageContainer}>
          <TouchableOpacity 
            style={styles.halfScreen} 
            onPress={() => navigation.navigate('ProfileForm', { type: 'friend' })}
          >
            <View style={styles.overlayContainer}>
              <Image 
                source={require('../assets/images/pickafriend.jpg')} 
                style={styles.image} 
                resizeMode="cover"
              />
              <Text style={styles.overlayText}>a friend</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.halfScreen} 
            onPress={() => navigation.navigate('ProfileForm', { type: 'partner' })}
          >
            <View style={styles.overlayContainer}>
              <Image 
                source={require('../assets/images/pickapartner.jpg')} 
                style={styles.image} 
                resizeMode="cover"
              />
              <Text style={styles.overlayText}>a partner</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.linkContainer}
        onPress={() => navigation.navigate('ProfileForm', { type: 'partner' })}
      >
        <Text style={styles.linkText}>or view a previous match ➜</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffead1', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#e6635a',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'InstrumentSans-Regular',
    fontWeight: 'medium',
    marginBottom: 45,
  },
  imageBackground: {
    backgroundColor: '#ffa130', 
    width: '100%',
    paddingVertical: 15, 
  },
  imageContainer: {
    flexDirection: 'row', 
    width: '100%',
    height: 400,
  },
  halfScreen: {
    flex: 1,
    position: 'relative',
  },
  overlayContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    position: 'absolute',
    top: '50%', 
    left: '50%', 
    transform: [{ translateX: -50 }, { translateY: -190 }], 
    fontSize: 20,
    color: '#e6635a', 
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  linkContainer: {
    marginTop: 35,
  },
  linkText: {
    color: '#e6635a',
    fontFamily: 'InstrumentSans-Regular',
    fontSize: 16,
    textDecorationLine: 'underline',

  },
});
