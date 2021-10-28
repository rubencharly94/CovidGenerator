import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
//import RNFetchBlob from 'rn-fetch-blob';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
//import * as RNFS from 'react-native-fs';

const Stack = createNativeStackNavigator();
//const fs = RNFetchBlob.fs;
//fs.createFile(NEW_FILE_PATH, 'tesssst', 'utf8');
  /* let filename = FileSystem.documentDirectory + "text.txt";
FileSystem.writeAsStringAsync(filename, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });*/

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
  defaultPicker: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DDDDDD",
    marginBottom: 20,
    paddingLeft: 15,
  },
});

const createFile = async (name, pps, batch, vaccine) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  console.log(permissions.granted);
  const uri = permissions.directoryUri;
  const certid = name.charAt(0) + pps + batch + vaccine;
  const date = new Date();
  let datetext = date.toString();
  const fileuri = await StorageAccessFramework.createFileAsync(uri, certid, "text/plain");
  await StorageAccessFramework.writeAsStringAsync(fileuri, "Name: " + name + "\nPPSN: " + pps + "\nBatch: " + batch + "\nVaccine: " + vaccine + "\nCertificate ID: " + certid + "\nDate: " + datetext);
}

const HomeScreen = ({navigation}) => {
  //var RNFS = require('react-native-fs');
  const [name, onChangeName] = React.useState("Full nam please here");
  const [pps, onChangePPS] = React.useState("PPS Number");
  const [batch, onChangeBatch] = React.useState("batch");
  const [selectedVaccine, setSelectedVaccine] = React.useState("Pfizer");

  
  

  
  /*var path = RNFS.DocumentDirectoryPath + '/certtest.txt';
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });*/
  

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
          onChangeText={onChangePPS}
          value = {pps}
        />
        <Text>Batch: </Text>
        <TextInput
          //style={styles.input}
          onChangeText={onChangeBatch}
          value = {batch}
        />
        <Text>Vaccine: </Text>
        <Picker
        style={styles.defaultPicker}
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
          onPress = {() => createFile(name, pps, batch, selectedVaccine)}
        />

        <Button 
          title = "Retrieve cert info"
          onPress = {() => navigation.navigate('CertGenerated')}
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