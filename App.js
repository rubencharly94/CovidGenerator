import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import * as RNFS from 'react-native-fs';

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
          name="CertGenerated"
          component={CertGenerated}
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
  const [name, onChangeName] = React.useState("Full name here");
  const [pps, onChangePPS] = React.useState("PPS Number");
  const [batch, onChangeBatch] = React.useState("batch");
  const [selectedVaccine, setSelectedVaccine] = React.useState();
  var path = RNFS.DocumentDirectoryPath + '/certtest.txt';
  return (
    
    
    <View style={styles.container}>
        <Text>Name: </Text>
        <TextInput
          //style={styles.input}
          onChangeText={onChangeName}
          value = {name}
        />
        <Text>PPS: </Text>
        <TextInput
          //style={styles.input}
          onChangePPS={onChangePPS}
          value = {pps}
        />
        <Text>Batch: </Text>
        <TextInput
          //style={styles.input}
          onChangeBatch={onChangeBatch}
          value = {batch}
        />
        <Text>Vaccine: </Text>
        <Picker
          selectedValue={selectedVaccine}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedVaccine(itemValue)
          }>
          <Picker.Item label="Pfizer" value="pfizer" />
          <Picker.Item label="Jansen" value="jansen" />
          <Picker.Item label="Moderna" value="moderna" />
          <Picker.Item label="AstraZeneca" value="astrazeneca" />
        </Picker>


        <Button 
        title = "Create certificate"
        onPress={() =>
          RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8'),
          navigation.navigate('CertGenerated')}
        />

        <StatusBar style="auto" />
      </View>

      
  )
}

const CertGenerated = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text>Here you can retrieve certs</Text>
        <Button 
        title = "Retrieve Cert"
        />

        <StatusBar style="auto" />
      </View>
  )
}