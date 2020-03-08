import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'native-base';


class Feeds extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      badgeCount: 4


    }


  }
  render(){
  return (
    <View style={styles.container}>
      <Text>Feeds Screen</Text>
      <Button rounded style={styles.button} onPress={()=>{
        this.props.navigation.navigate("Details")
      }}>
        <Text>Go To Detail Screen</Text>
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

export default Feeds;