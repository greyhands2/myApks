import React from 'react';
import { StyleSheet, Text, View,  Alert } from 'react-native';
import {Button} from 'native-base';


class WelcomeScreen extends React.Component {
  render(){
  return (
    <View style={styles.container}>
     <Button style={styles.button}  rounded onPress={()=>{
         this.props.navigation.navigate("Dashboard");
     }}>
         <Text style={styles.buttonText}>
            Login
         </Text>
     </Button>

     <Button style={styles.button}  rounded onPress={()=>{
         Alert.alert("Dummy Sign Up")
        }}>
         <Text style={styles.buttonText}>
            Sign Up 
         </Text>
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

export default WelcomeScreen;