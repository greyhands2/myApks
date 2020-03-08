import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'native-base';
class Profile extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button rounded style={styles.button} onPress={()=>{
        this.props.navigation.navigate("Gallery")
      }}>
        <Text>Go To Gallery Screen</Text>
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

export default Profile;