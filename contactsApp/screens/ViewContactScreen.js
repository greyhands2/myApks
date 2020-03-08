import React from 'react';
import { StyleSheet, Text, View,  ScrollView,  TouchableOpacity, Linking, Alert, AsyncStorage, Platform } from 'react-native';

import { Card, CardItem } from 'native-base';
import { Entypo } from '@expo/vector-icons';


export default class ViewContactScreen extends React.Component {
  constructor(props){
    super(props);

    this.state={
        fname: "DummyText",
        lname: "DummyText",
        phone: "DummyText",
        email: "DummyText",
        address: "DummyText",
        key: "DummyText"

    };
  }

  static navigationOptions = {
    title: "View Contact"
  };

componentDidMount(){
  const { navigation } = this.props;
  navigation.addListener("willFocus", () => {
    var key = this.props.navigation.getParam("key", "");

    //call a method to populate or use key
    this.getContact(key);
  });
}

getContact = async (key)=>{
  await AsyncStorage.getItem(key)
  .then((contactJsonString)=>{
    var contact = JSON.parse(contactJsonString);
  //fix the key in the contact object result gotten from the AsyncStorage
    contact["key"]= key;
//since the contact is an object we can just pass it in the setState without {}
    this.setState(contact);
  })
  .catch((err)=>{
    console.log(err);
  })
};


callAction = (phone)=> {
  let phoneNumber = phone;
  if(Platform.OS !== "android"){
    phoneNUmber= `telprompt:${phone}`;
  } else {

    phoneNumber = `tel:${phone}`;
  }

Linking.canOpenURL(phoneNumber)
.then((supported)=>{
  if(!supported){
    Alert.alert("Phone Number is not Available");
  } else {
    return Linking.openURL(phoneNumber);
  }
})
.catch((err)=>{
  console.log(err)
})
};


smsAction = (phone) =>{
  let phoneNumber = phone;
  phoneNumber = `sms:${phone}`;

Linking.canOpenURL(phoneNumber)
.then((supported)=>{
  if(!supported){
    Alert.alert("Phone Number is not Available");
  } else {
    return Linking.openURL(phoneNumber);
  }
})
.catch((err)=>{
  console.log(err)
})
};



editContact = (key) => {
  this.props.navigation.navigate("Edit", {
    key: key
  });

}

deleteContact = (key) => {
  Alert.alert(
    "Delete Contact ?",
    `${this.state.fname} ${this.state.lname}`,
    [
      {
        text: "Cancel", onPress: () => console.log("cancel tapped")
      },
      {
        text: "OK", 
        onPress: async () => {
          await AsyncStorage.removeItem(key)
          .then(()=>{
            this.props.navigation.goBack();
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
    ]
  )

}


  render(){
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contactIconContainer}>
        <View style={styles.iconContainer}>
        <Text style={styles.contactIcon}>
        {this.state.fname[0].toLowerCase()}

        </Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.name}>
        {this.state.fname} {this.state.lname}

        </Text>
      </View>
      </View>
     
      <View  style={styles.infoContainer}>

        <Card>

          <CardItem bordered>

            <Text style={styles.infoText}>
              Phone
            </Text>
          </CardItem>
          <CardItem bordered>

            <Text style={styles.infoText}>
              {this.state.phone}
            </Text>
          </CardItem>
        </Card>
        <Card>

          <CardItem bordered>

            <Text style={styles.infoText}>
              Email
            </Text>
          </CardItem>
          <CardItem bordered>

            <Text style={styles.infoText}>
              {this.state.email}
            </Text>
          </CardItem>
        </Card>

        <Card>

          <CardItem bordered>

            <Text style={styles.infoText}>
              Address
            </Text>
          </CardItem>
          <CardItem bordered>

            <Text style={styles.infoText}>
              {this.state.address}
            </Text>
          </CardItem>
        </Card>
      </View>

<View style={{flex:1, flexDirection: "row"}}>
      <Card style={[styles.infoContainer, {flex:50}]}>

        <CardItem style={styles.actionButton}>
          <TouchableOpacity onPress={()=>{
            this.smsAction(this.state.phone)
          }}>
            <Entypo name="message" size={50} color="#c1c1c1"/>
          </TouchableOpacity>
        </CardItem>
      </Card>
      <Card style={[styles.infoContainer, {flex:50}]}>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity onPress={()=>{
            this.callAction(this.state.phone)
          }}>
            <Entypo name="phone" size={50} color="#c1c1c1"/>
          </TouchableOpacity>
        </CardItem>
        
      </Card>
      <Card style={[styles.infoContainer, {flex:50}]}>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity onPress={()=>{
            this.editContact(this.state.key)
          }}>
            <Entypo name="edit" size={50} color="#c1c1c1"/>
          </TouchableOpacity>
        </CardItem>
        
      </Card>
      <Card style={[styles.infoContainer, {flex:50}]}>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity onPress={()=>{
            this.deleteContact(this.state.key)
          }}>
            <Entypo name="trash" size={50} color="#c1c1c1"/>
          </TouchableOpacity>
        </CardItem>
        
      </Card>
      </View>

    </ScrollView>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#000d1a",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  contactIcon: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoContainer: {
    flexDirection: "column",
    padding: 0
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  },
  iconContainer: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8395A7",
    borderRadius: 100,
    marginBottom: 50,
    marginTop: 15,
    padding: 30
  },
});
