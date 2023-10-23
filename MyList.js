import { Header } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { Input, Button, Avatar, Badge } from '@rneui/themed';
import { ListItem } from '@rneui/themed';
import { AirbnbRating } from '@rneui/themed';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, ScrollView  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image, Card, FAB } from '@rneui/themed';
import database from './firebase';
import { push, ref, onValue, remove } from 'firebase/database';



export default function MyList ({route, navigation}) {

    
  const [list, setList] = useState([]);

  useEffect (() => {
    const itemsRef = ref(database, 'list/');
    onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    //console.log(data)
    const items = data ? Object.keys(data).map(key =>({key, ...data[key]})) : [];
    //console.log(items)
    setList(items);
    })
    }, []);

  const saveItem = (name, address, type, report, stars) => {
    push(
      ref(database, 'list/'),
      {'restaurant': name, 'address': address, 'type':type, 'report':report, 'stars':stars })
;  }

const deleteItem = (key) => {
  //console.log('deleteItem', key);
  remove(ref(database, 'list/' + key))
};

const confirmDelete = key =>
Alert.alert(
  "Delete place",
  "Are you sure you want to delete this restaurant from your list?",
  [
    {
      text:'Cancel',
    },
    {
      text:'Yes',
      onPress:()=> deleteItem(key),
    }
  ],
  {
    cancelable:true
  }
);


useEffect (() => {
    const {name, address, type, report, stars} = route.params;
    
  saveItem(name, address, type, report, stars);
}, [route.params?.name]);



const renderItem = ({item}) => (
  <ListItem 
  bottomDivider
  topDivider
  
  onLongPress={() => confirmDelete(item.key)}>
    <ListItem.Content style={{ justifyContent: 'space-between'}} >
      <ListItem.Title> {item.restaurant} <Badge
            status="warning"
            value={item.stars}
            containerStyle={{ position: 'absolute', top: 5, left: 60 }}/></ListItem.Title>
      <ListItem.Subtitle right> {item.address}</ListItem.Subtitle>
      <ListItem.Subtitle> {item.type}</ListItem.Subtitle>
      <ListItem.Subtitle> {item.report} </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron/>
      </ListItem>
);


  return (
    
    <View style={styles.container}>
      <Header backgroundColor='purple' 
      centerComponent={{text: 'MY LIST', style:{color: '#fff'}}}/>
           
      
      
      <FlatList
      //style={styles.listcontainer}
        data={list}
        keyExtractor={item => item.key} 
        renderItem={renderItem }
         
         />   
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  listcontainer: {
    //flexDirection: 'column',
    backgroundColor: '#fff',
    //alignItems: 'center'
   },
});