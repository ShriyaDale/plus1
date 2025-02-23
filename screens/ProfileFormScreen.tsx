import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import * as ImagePicker from 'expo-image-picker';



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
    city: '',
    state: '',
  });
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to upload a photo!');
      }
    })();
  }, []);

  // 📸 Function to Open Image Picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Enables cropping
      aspect: [1, 1], // Forces square crop
      quality: 1, // High quality
    });

  // ✅ Ensure assets array exists and is not empty before accessing it
  if (!result.canceled && result.assets.length > 0) {
    setImage(result.assets[0].uri);
  }
};

  const states = [
    'al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia',
    'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj',
    'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt',
    'va', 'wa', 'wv', 'wi', 'wy'
  ];

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <Text style={styles.title}>pre-match questions:</Text>

        {/* 📸 Profile Picture Upload Section */}
        {/* ✅ Change 1: Wrap the entire image area in TouchableOpacity */}
        <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            // ✅ Change 2: "Tap to Upload" is inside the button, so it's clickable
            <Text style={styles.uploadText}>upload profile photo</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.text}>1. your location:</Text>
        <View style={styles.inputRow}>
          <View style={styles.cityInputContainer}>
          <TextInput
            style={styles.cityInput}
            placeholder="enter city"
            placeholderTextColor="rgba(230, 99, 90, 0.3)" // ✅ More opaque placeholder
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
          />
          </View>

          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropbtn}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text style={styles.dropbtnText}>
                {formData.state || 'state ▼'}
              </Text>
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdownContent}>
                <ScrollView style={styles.scrollableDropdown} nestedScrollEnabled={true}>
                  {states.map((state) => (
                    <TouchableOpacity
                      key={state}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFormData({ ...formData, state });
                        setDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{state}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.text}>2. preferred partner age range:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.age}
            onValueChange={(value) => setFormData({ ...formData, age: value })}
            style={styles.picker}
            itemStyle={{ color: '#e6635a' }}
          >
            <Picker.Item label="age range" value="" />
            <Picker.Item label="18 - 24" value="teen" />
            <Picker.Item label="25 - 34" value="twenties" />
            <Picker.Item label="35 - 44" value="mid age" />
            <Picker.Item label="45 - 60" value="old" />
            <Picker.Item label="60+" value="mid age" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>

        <Text style={styles.text}>3. your gender:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            style={styles.picker}
            itemStyle={{ color: '#e6635a' }}
          >
            <Picker.Item label="select gender" value="" />
            <Picker.Item label="male" value="male" />
            <Picker.Item label="female" value="female" />
            <Picker.Item label="non-binary" value="non-binary" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>

        <Text style={styles.text}>4. your sexual orientation:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.orientation}
            onValueChange={(value) => setFormData({ ...formData, orientation: value })}
            style={styles.picker}
            itemStyle={{ color: '#e6635a' }}
          >
            <Picker.Item label="select orientation" value="" />
            <Picker.Item label="straight" value="straight" />
            <Picker.Item label="gay" value="gay" />
            <Picker.Item label="bisexual" value="bisexual" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Swipe')}>
          <Text style={styles.buttonText}>continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#ffead1',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffead1',
    marginTop: 75
  },
  title: {
    color: '#e6635a',
    fontSize: 35,
    fontFamily: 'InstrumentSans-Regular',
    marginBottom: 50,
    alignSelf: 'center',
    fontWeight: 'medium',
    textAlign: 'center',
  },
  text: {
    color: '#e6635a',
    fontSize: 25,
    fontFamily: 'InstrumentSans-Regular',
    marginBottom: 10,

  },
  inputRow: {
    flexDirection: 'row',
    color: 'black',
    alignItems: 'center',
    marginBottom: 50,
    width: 318
},
  cityInputContainer: {
    flex: 3, 
  },
  cityInput: {
    height: 50,
    backgroundColor: '#ffff',
    color: '#white',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 20,
    marginRight: 10,
  },
  dropdownContainer: {
    flex: 0.8,
    position: 'relative',  // ✅ Allows absolute positioning for the dropdown
    zIndex: 1,
  },
  dropbtn: {
    backgroundColor: '#ffff',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
  dropbtnText: {
    color: "rgba(230, 99, 90, 1)", // ✅ More opaque red-orange text
    // color: '#e6635a',
    fontSize: 20,
  },
  dropdownContent: {
    position: 'absolute', // ✅ Detach from normal layout flow
    top: 40, // ✅ Move it down so it overlays the button
    left: 0,
    width: 100,
    backgroundColor: '#ffb965',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    maxHeight: 150,
    zIndex: 1,  // ✅ Ensures it appears above other UI elements
    shadowColor: "#000",  // ✅ Adds slight shadow for visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollableDropdown: {
    maxHeight: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    color: '#e6635a',
    fontSize: 20,
    zIndex: 1,
  },
  pickerContainer: {
    backgroundColor: 'white', 
    borderRadius: 12,
    marginBottom: 50,
    paddingHorizontal: 10,
},
  picker: {
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#e6635a',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 100
  },
  buttonText: {
    color: '#ffff',
    fontSize: 20,
    fontFamily: 'InstrumentSans-Regular',
  },
  imageUploadContainer: { 
    width: 120, 
    height: 120, 
    backgroundColor: '#e6635a', 
    borderRadius: 60, 
    alignItems: 'center', 
    justifyContent: 'center', 
    alignSelf: 'center', 
    marginBottom: 50 

  },
  uploadText: { 
    color: 'white', 
    fontSize: 16, 
    alignSelf: 'center',
    textAlign: 'center',
},
  profileImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 60 
  },
});
