import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const index = ({userName, image}) => {
  return (
    <View>
      <View style={styles.listItemContainer}>
        <Image source={{uri : image}} style={styles.avatar}/>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.bottomDivider}/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    marginRight: 25
  },
  listItemContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  userName: {
    fontSize: 18
  },
  bottomDivider: {
    backgroundColor: '#EBEBEB',
    height: 1
  }
})
