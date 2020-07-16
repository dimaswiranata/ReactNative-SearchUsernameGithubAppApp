import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const index = ({onChangeText}) => {
  return (
    <View style={styles.comp}>
      <View style={styles.seacrhBarContainer}>
        <Icon 
          name="search" 
          size={20} 
          color="#818181"
          style={styles.icon}
        />
        <TextInput
          placeholder="Search Github Users"
          style={styles.input}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  comp: {
    backgroundColor: '#01BCD5'
  },
  seacrhBarContainer : {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: 15
  },
  input: {
    fontSize: 18,
    width: '90%'
  }
})
