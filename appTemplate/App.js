import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Icon} from 'native-base';
import {createSwitchNavigator,  createAppContainer} from 'react-navigation';
import {DrawerActions, createDrawerNavigator} from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';


import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import Feeds from './screens/Feeds';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Details from './screens/Details';
import Gallery from './screens/Gallery';
import Security from './screens/Security';
import Discover from './screens/Discover';
import BottomTabBar from 'react-navigation-tabs/src/views/BottomTabBar';
class App extends React.Component {
  render(){
  return (
    <AppContainer />
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
});







const FeedStack = createStackNavigator({
  Feeds: {screen: Feeds,
  navigationOptions: ({navigation})=>{
    
    return {
      headerTitle: "Feeds",
      headerRight: (
        <Button onPress={()=>{

          navigation.dispatch(DrawerActions.toggleDrawer());     
         
      }} transparent>
        <Icon  style={{fontSize: 20, color: '#ab47bc'}} name='menu' />
      </Button>

      )
    }
  }
  },
  Details: {screen: Details,
  navigationOptions: ({navigation})=>{
    return {

      headerTitle: "Details"
    }

  }
  }

},
{
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
})



const ProfileStack = createStackNavigator({
  Profile: {screen: Profile,
  navigationOptions: ({navigation})=>{
    
    return {
      headerTitle: "Profile",
      headerRight: (
        <Button onPress={()=>{

          navigation.dispatch(DrawerActions.toggleDrawer());     
         
      }} transparent>
        <Icon  style={{fontSize: 20, color: '#ab47bc'}} name='menu' />
      </Button>

      )
    }
  }
  },
  Gallery: {screen: Gallery, 
  navigationOptions: ({navigation})=>{
    return {
      headerTitle: "Gallery"

    }
    
  }}

},
{
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
})




const SettingsStack = createStackNavigator({
  Settings: {screen: Settings,
  navigationOptions: ({navigation})=>{
    
    return {
      headerTitle: "Settings",
      headerRight: (
        <Button onPress={()=>{

          navigation.dispatch(DrawerActions.toggleDrawer());     
         
      }} transparent>
        <Icon  style={{fontSize: 20, color: '#ab47bc'}} name='menu' />
      </Button>

      )
      
    
  }
  }},
  Security: {screen: Security,
  navigationOptions: ({navigation})=>{
    return {
      headerTitle: "Security"

    }
    
  }}

},
{
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
})







const DashBoardTabNavigator = createBottomTabNavigator({
  Feeds: {screen:FeedStack,
    navigationOptions: ({navigation})=>{
      let badgeCount = 98;
      let count = "*";
      return {
      
        tabBarLabel: "Feeds",
        tabBarIcon: ({tintColor})=>(
          <View style={{ width: 24, height: 24, margin: 5 }}>
          <Ionicons name="ios-megaphone" size={20} color={tintColor} />
          
          
          {badgeCount > 0 && (
            <View
              style={{
                // If you're using react-native < 0.57 overflow outside of parent
                // will not work on Android, see https://git.io/fhLJ8
                position: 'absolute',
                right: -3,
                top: -3,
                backgroundColor: '#FF5733',
                borderRadius: 100,
                width: 12,
                height: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {count}
              </Text>
            </View>
          )}
        </View>
          )
      }
    }},
  Profile: {screen:ProfileStack,
    navigationOptions: ({navigation})=>{
      
      return {
        
        tabBarLabel: "Profile",
        tabBarIcon: ({tintColor})=>(
          <Ionicons name="ios-person" size={20} color={tintColor} />
        )
      }
    }},
  Settings: {screen:SettingsStack,
    navigationOptions: ({navigation})=>{
      
      return {
        
        tabBarLabel: "Settings",
        tabBarIcon: ({tintColor}) =>
           ( <Ionicons name="ios-options" size={20} color={tintColor} />)
        
      
    }
    }}
  
},
{
  navigationOptions: ({navigation})=> {

    const {routeName} = navigation.state.routes[navigation.state.index];
   
    return {
      
   header: null,
      headerTitle: routeName
    }
  },  
  

  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#ab47bc',
      inactiveTintColor: 'gray',
      
      style:{
         padding : 15,
         paddingVertical: 5
      }
  
}
})



const DashBoardStackNavigator = createStackNavigator({
  DashBoardTabNavigator: DashBoardTabNavigator,
  Discover: {screen: Discover,
    navigationOptions: ({navigation})=>{
    
      return {
        headerTitle: "Discover",
        headerRight: (
          <Button onPress={()=>{
  
            navigation.dispatch(DrawerActions.toggleDrawer());     
           
        }} transparent>
          <Icon  style={{fontSize: 20, color: '#ab47bc'}} name='menu' />
        </Button>
  
        )
      }
    }
  }


},
{

  defaultNavigationOptions: ({navigation})=>{
    return {
      headerRight: (
        <Button onPress={()=>{

          navigation.dispatch(DrawerActions.toggleDrawer());     
         
      }} transparent>
        <Icon  style={{fontSize: 20, color: '#ab47bc'}} name='menu' />
      </Button>

      )
    }
  }
})






const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: DashBoardStackNavigator
  },
  Discover: {screen: Discover},
  Profile: {screen: ProfileStack},
  Settings: {screen: SettingsStack}
  


},
{
  initialRouteName: 'Home',
  
  hideStatusBar: false,
   
   drawerBackgroundColor: 'rgba(255,255,255,.9)',
   
   contentOptions: {
     activeTintColor: '#fff',
     activeBackgroundColor: '#ab47bc',
   },
 })

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen: WelcomeScreen},
  Dashboard: {screen: AppDrawerNavigator}


})

const AppContainer = createAppContainer(AppSwitchNavigator);
export default App;