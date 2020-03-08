import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'native-base';
class Settings extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button rounded style={styles.button} onPress={()=>{
        this.props.navigation.navigate("Security")
      }}>
        <Text>Go To Security Screen</Text>
      </Button>
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

export default Settings;