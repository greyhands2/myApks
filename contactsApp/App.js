import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddNewContactSreen';
import EditScreen from './screens/EditContactScreen';
import ViewScreen from './screens/ViewContactScreen';

const App = createAppContainer(createStackNavigator({
Home: {screen: HomeScreen},
Add: {screen: AddScreen},
Edit: {screen: EditScreen},
View: {screen: ViewScreen}
},
{
defaultNavigationOptions: {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor:"#000",
    height:40
  },
  headerTitleStyle: {
    color: "#ffffff",
    fontWeight: "bold"
  }

}
}));

export default App;