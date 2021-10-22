import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "StartScreen"
          component ={HomeScreen}
        />
        <Stack.Screen
          name="Private Gallery"
          component={PrivateGallery}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text>Open up App.js to your app!</Text>
        <Button 
        title = "Access to Private Gallery"
        onPress={() =>
          navigation.navigate('Private Gallery')}
        />

        <StatusBar style="auto" />
      </View>
  )
}

const PrivateGallery = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text>Here you can add images from your phone to the private Gallery</Text>
        <Button 
        title = "Add image"
        />

        <StatusBar style="auto" />
      </View>
  )
}