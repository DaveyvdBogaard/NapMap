import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingScreen from './views/LandingScreen';
import SignInScreen from './views/SignInScreen';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignUpScreen from './views/SignUpScreen';
import MapScreen from './views/MapScreen';

class App extends React.Component<any> {
  isLoggedIn = (user: any) => {
    if (user !== null) {
      return true;
    } else {
      return false;
    }
  };

  showTabBar = (route: any) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Map';
    switch (routeName) {
      case 'DetailPage':
        return false;
      default:
        return true;
    }
  };

  render() {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    return (
      <Stack.Navigator initialRouteName="Landing" headerMode="none">
        {this.isLoggedIn(this.props.user) ? (
          <Stack.Screen name="Home">
            {() => (
              <Tab.Navigator
                screenOptions={({route}) => ({
                  tabBarVisible: this.showTabBar(route),
                })}
                tabBarOptions={{
                  activeTintColor: '#008F68',
                  inactiveTintColor: 'gray',
                }}
                initialRouteName="Map">
                <Tab.Screen
                  name="Map"
                  component={MapScreen}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <Icon name="globe" color={color} size={size} />
                    ),
                  }}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

const mapDispatchToProps = () => ({
});

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
