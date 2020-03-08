import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



class Gallery extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text>Gallery Screen</Text>
      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    backgroundColor: "#7b1fa2",
    marginTop: 40,
    width: "80%",
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default Gallery;