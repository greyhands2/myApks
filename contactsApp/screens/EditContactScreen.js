import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, AsyncStorage, Alert, ScrollView } from 'react-native';
import {Form,Item, Input, Label, Button} from 'native-base';

export default class EditContactScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address:"",
      key: ""

    };
  }

componentDidMount(){
  const {navigation} = this.props;
  navigation.addListener("willFocus", ()=>{

    var key  = this.props.navigation.getParam("key", "");
    //populate state with key
    this.getContact(key);

  })


}


getContact = async (key)=>{

await AsyncStorage.getItem(key)
.then((contactJsonString)=>{
var contact = JSON.parse(contactJsonString);
contact["key"] = key;
this.setState(contact);
this.forceUpdate();
})
.catch((err)=>{
  console.log(err);
})

}


  static navigationOptions = {
    title: "Edit Contact"
  };

updateContact = async (key) =>{
  if(
    this.state.fname !== "" && this.state.lname !== "" && this.state.phone !== "" && this.state.email !== "" && this.state.address !== ""
  ){
//create contact object
  var contact = {
    fname: this.state.fname,
    lname: this.state.lname,
    phone: this.state.phone,
    email: this.state.email,
    address: this.state.address
  }
  await AsyncStorage.mergeItem(key, JSON.stringify(contact))
  .then(()=>{
    this.props.navigation.goBack();
  })
  .catch((err)=>{
    console.log(err);
  })
  }

  
}

  render(){
  return (
    <TouchableWithoutFeedback onPress={()=> {
      Keyboard.dismiss
    }}>
    <ScrollView style={styles.container}>
     <Form>
       <Item style={styles.inputItem}>

         <Label>First Name</Label>
         <Input autoCorrect={false}
         autoCapitalize="none"
         keyboardType="default"
         value={this.state.fname}
         onChangeText={(firstName)=> {this.setState({fname:firstName})}}
         />
       </Item>


       <Item style={styles.inputItem}>

         <Label>Last Name</Label>
         <Input autoCorrect={false}
         autoCapitalize="none"
         keyboardType="default"
         value={this.state.lname}
         onChangeText={(lastName)=> {this.setState({lname:lastName})}}
         />
       </Item>


       <Item style={styles.inputItem}>

         <Label>Phone Number</Label>
         <Input autoCorrect={false}
         autoCapitalize="none"
         keyboardType="number-pad"
         value={this.state.phone}
         onChangeText={(phoneNumber)=> {this.setState({phone:phoneNumber})}}
         />
       </Item>

       <Item style={styles.inputItem}>

         <Label>Email</Label>
         <Input autoCorrect={false}
         autoCapitalize="none"
         keyboardType="email-address"
         value={this.state.email}
         onChangeText={(emailAddr)=> {this.setState({email:emailAddr})}}
         />
       </Item>

       <Item style={styles.inputItem}>

         <Label>Address</Label>
         <Input autoCorrect={false}
         autoCapitalize="none"
         keyboardType="default"
         value={this.state.address}
         onChangeText={(addr)=> {this.setState({address:addr})}}
         />
       </Item>

       
     </Form>
     <Button rounded style={styles.button} onPress={()=> {
this.updateContact(this.state.key);

     }}>
       <Text style={styles.buttonText}>
         Update
         </Text>
       </Button>
     <View style={styles.empty}></View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#1287A5",
    marginTop: 40,
    alignItems: "center",
    justifyContent:"center",
    width: "90%",
    alignSelf:"center",
    shadowColor: "#c1c1c1",
    borderRadius:30,
    borderWidth:2,
    borderColor: "#1287A5"
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 200,
    backgroundColor: "#FFF"
  }
});