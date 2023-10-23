import { StyleSheet} from 'react-native';

import React, { useState, useEffect } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Restaurant from './Restaurant';
import Map from './Map';
import MyList from './MyList';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="MyList" component={MyList} />
        </Stack.Navigator>
        </NavigationContainer>
      
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{ width:200, 
    borderColor:'grey', 
    borderWidth: 1
  },
  button:{
    flexDirection: 'row', 
  alignItems: 'center',
  justifyContent: 'space-between'
},



});
