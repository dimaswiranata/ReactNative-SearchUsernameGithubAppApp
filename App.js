import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, LogBox } from 'react-native';
import { ItemList, SearchBar } from "./src/component";
import axios from "axios";

const App = () => {

  // LogBox.ignoreWarnings(['Failed child context type: Invalid child context `virtualizedCell.cellKey` of type `number` supplied to `CellRenderer`, expected `string`.']);

  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [arrayholder, setArrayholder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getData();
    return () => {
      console.log('Clean Up')
    }
  }, []);

  const getData = async () => {
    setIsLoading(true);
    await axios
      .get(`https://api.github.com/users`)
      .then(res => {
        const data = res.data;
        console.log(data);
        setData(data);
        setArrayholder(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(true);
        setErrorMessage(err.message)
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
        {
          error ? (
            <Text>{errorMessage}</Text>
          ) : (
            <Text>Start Write Username</Text>
          )
        }
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
        renderItem={({ item, i }) => (
          <ItemList
            image={item.avatar_url}
            userName={item.login}
          />
        )}
        keyExtractor={(item,index) => index.toString()}
      />
    );
  }

  return (
    <>
      <SearchBar
        onChangeText={e => searchFilterFunction(e)}
        value={username}
      />
      <View style={styles.page}>
        {
          !isLoading ? (
            MainScreen
          ) : (
            <View style={styles.text}>
              <ActivityIndicator/>
            </View>
          )
        }
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    alignItems: 'center',
  }
})
