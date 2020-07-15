import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from "axios";

const App = () => {

  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [arrayholder, setArrayholder] = useState([]);
  
  useEffect(() => {
    getData();
    return () => {
      console.log('Clean Up')
    }
  }, []);

  const getData = async () => {
    await axios
      .get(`https://api.github.com/users`)
      .then(res => {
        const data = res.data;
        console.log(data);
        setData(data);
        setArrayholder(data);
      })
      .catch(err => {
        console.log('error', err.message);
      });
  }

  const searchFilterFunction = (text) => {
    const newData = arrayholder.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.login ? item.login.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
    setUsername(text);
  }

  return (
    <View>
      <SearchBar
        placeholder="Search Github Users"
        lightTheme
        // inputStyle={{backgroundColor: '#fff'}}
        // leftIconContainerStyle={{backgroundColor: '#fff'}}
        // containerStyle={{backgroundColdeor: '#aaa'}}
        // platform="android"
        onChangeText={e => searchFilterFunction(e)}
        autoCorrect={false}
        value={username}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem
            keyExtractor={item.node_id}
            leftAvatar={{rounded: false, source: { uri: item.avatar_url } }}
            title={item.login}
            bottomDivider
          />
        )}
      />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
