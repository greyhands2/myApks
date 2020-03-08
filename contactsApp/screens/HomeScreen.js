import React from 'react';
import { StyleSheet, Text, TouchableOpacity,FlatList,  AsyncStorage, View } from 'react-native';

import {Card} from 'native-base';
import { Entypo} from '@expo/vector-icons';


export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }
  static navigationOptions = {
      title: "Contact App"
  }

componentWillMount(){
  const navigation= this.props.navigation;
  navigation.addListener("willFocus", ()=> {
    this.getAllContacts();

  })
}

  //get all contacts
getAllContacts = async () => {

await AsyncStorage.getAllKeys()
.then(keys =>{
  console.log(keys);
  return AsyncStorage.multiGet(keys)
  .then((result)=>{
    this.setState({
      data: result.sort(function(a, b){
        if(JSON.parse(a[1]).fname < JSON.parse(b[1]).fname){
          return -1;
        }

        if(JSON.parse(a[1]).fname > JSON.parse(b[1]).fname){
          return 1;
        }
        return 0;
      })
    })
  })
  .catch((err)=>{
    console.log("multi get error"+err)
  })
})
.catch((error)=>{
  console.log("load my fucking errors "+error);
})
console.log(this.state.data)
}


  render(){
  return (
    <View style={styles.container}>
      <FlatList data={this.state.data} renderItem={({item}) =>{
        contact = JSON.parse(item[1]);
        return (
          <TouchableOpacity onPress={()=>{  
            this.props.navigation.navigate("View", {
              key: item[0].toString()
              
            })

          }}>
            <Card style={styles.listItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.contactIcon}>
                  {contact.fname[0].toUpperCase()}
                </Text>
              </View>
              <View  style={styles.infoContainer}>
              <Text style={styles.infoText}>
                  {contact.fname} {contact.lname}
                </Text>

                <Text style={styles.infoText}>
                  {contact.phone} 
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )

      }} keyExtractor={(item,index)=>item[0].toString()}></FlatList>
      <TouchableOpacity style={styles.floatButton} onPress={()=> {
          this.props.navigation.navigate("Add");
      }}>
          <Entypo name="plus" size={30}
          color="#fff"/>
      </TouchableOpacity>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000d1a"
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#000d1a",
    borderColor:"#000d1a",
    marginTop: 0,
    marginBottom: 0
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8395A7",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2,
    color: "#fff"
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#1287A5",
    borderRadius: 100
  }
});
