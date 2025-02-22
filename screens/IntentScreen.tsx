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
    backgroundColor: '#ECE0F6', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#5C0983',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'InstrumentSans-Regular',
    fontWeight: 'medium',
    marginBottom: 45,
  },
  imageBackground: {
    backgroundColor: '#5C0983', 
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
  },
  overlayContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlayText: {
    position: 'absolute',
    top: 20, 
    left: '50%', 
    transform: [{ translateX: -30 }], 
    fontSize: 18,
    color: '#5C0983', 
  },
  linkContainer: {
    marginTop: 35,
  },
  linkText: {
    color: '#5C0983',
    fontFamily: 'InstrumentSans-Regular',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
