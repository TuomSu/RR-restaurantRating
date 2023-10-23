import { Header } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { Input, Button, Avatar } from '@rneui/themed';
import { ListItem } from '@rneui/themed';
import { AirbnbRating } from '@rneui/themed';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, ScrollView  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image, Card, FAB } from '@rneui/themed';
import MyList from './MyList';


import KEY from './apiKey';

export default function Restaurant({route, navigation}){
    const [fullName, setfullName] = useState('');
    const [photo, setPhoto] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');

    const[stars, setStars] = useState('');
    const[type, setType] = useState('');
    const[report, setReport] = useState('');

    
 

useEffect(() => {
    (async () => {
        const {name} = route.params;
        setfullName(name);
        const {photo} = route.params;
        console.log({photo});
        setPhoto(Object.values({photo}));
        
        const {price} = route.params;
        setPrice(price);
        const {address} = route.params;
        setAddress(address);
        console.log(name, price, address);

    })();
}, []);
    

return(
  <ScrollView>
  
    <View>
      
        <Header backgroundColor= 'purple'
      centerComponent={{text: fullName + ' ', style:styles.heading}}/>
      <ListItem>
    <Icon type="material" iconStyle="rounded" name= 'list' color='purple' />
    <ListItem.Content>
      <ListItem.Title> {address}</ListItem.Title>
    </ListItem.Content>
  </ListItem>
      
      <Image
        source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${KEY}`}} style={{width: '100%', height: 150}}/>
        <ListItem>
        <Icon type="material" iconStyle="rounded" name= 'money' color='purple' />
    <ListItem.Content>
      <ListItem.Title> Price level {price} / 3</ListItem.Title>
    </ListItem.Content>
  </ListItem>
  
  <Card>
          <Card.Title>ADD RATING</Card.Title>
          <Card.Divider />
        <AirbnbRating
          count={3}
          reviews={[
            'Ok',
            'Very good',
            'Excellent',
          ]}
          defaultRating={0}
          size={20}
          onFinishRating={rating => setStars(rating)}
        />
      <Input placeholder='Food type' label='Ethnicity' style={{marginTop: 5, fontSize: 18, width: 200 }}
      onChangeText={(type) => setType(type)}
      value={type}/>
    <Input placeholder='My experience' label='Report' style={{marginTop: 5, fontSize: 18, width: 200 }}
    onChangeText={(report) => setReport(report)}
    value={report}/>
    <Button icon={{name: 'favorite', color:'purple' }} title="Save to MyList" onPress={() => navigation.navigate('MyList', {name:fullName, address: address, type:type, report: report, stars:stars } )} />
    </Card>
    </View>
    </ScrollView>
    
    
)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      //alignItems: 'center'
     },
     heading: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    }
  });