import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { ItemList, SearchBar } from "./src/component";
import axios from "axios";

const App = () => {

  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [arrayholder, setArrayholder] = useState([]);
  const [dashboard, setDashboard] = useState(false);
  const [empty, setEmpty] = useState(false);

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
    if (username.length < 1){
      MainScreen = (
        <View style={styles.welcomeText}>
          <Text>Start Write Username</Text>
        </View>
      );
    }
    const newData = arrayholder.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.login ? item.login.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
    setUsername(text);
  }

  let MainScreen = <View/>;

  if (username.length < 1){
    MainScreen = (
      <View style={styles.text}>
        <Text>Start Write Username</Text>
      </View>
    );
  } else if (data.length < 1){
    MainScreen = (
      <View style={styles.text}>
        <Text>Username Not Found</Text>
      </View>
    );
  } else {
    MainScreen = (
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
    );
  }

  // if (data.length > 0){
  //   MainScreen = (
  //     <FlatList
  //       data={data}
  //       renderItem={({ item }) => (
  //         <ItemList
  //           keyExtractor={item.id}
  //           image={item.avatar_url}
  //           userName={item.login}
  //         />
  //       )}
  //     />
  //   );
  // }

  return (
    <>
      <SearchBar
        onChangeText={e => searchFilterFunction(e)}
        value={username}
      />
      <View style={styles.page}>
        {MainScreen}
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
  }
})
