import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { ItemList, SearchBar } from "./src/component";
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
        onChangeText={e => searchFilterFunction(e)}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemList
            keyExtractor={item.id}
            image={item.avatar_url}
            userName={item.login}
          />
        )}
      />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
