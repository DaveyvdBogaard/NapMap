import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { signIn, dismissAuthError } from '../actions/index';
import { connect } from 'react-redux';
import { navigationRef } from '../shared/NavigationService';

class LandingScreen extends React.Component<any> {
  signInWithFacebook = () => {
    this.props.onSignInWithFacebook();
  }

  navigate = (loc: any) => {
    navigationRef.current?.navigate(loc)
  }

  render() {
    return (
      <ImageBackground
        source={require('../shared/images/landing.jpg')}
        style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['rgba(111, 111, 111, 0)', 'rgb(0,0,0)']}
          style={styles.gradient}>
          <View style={styles.topContainer}>
            <Text style={styles.h1}>Foodwaste</Text>
            <Text style={styles.h2}>Saving food jonguh</Text>
          </View>
          <View style={styles.middleContainer}>
          </View>
          <View style={styles.bottomContainer}>
            <Button
              title="Continue with Facebook"
              buttonStyle={styles.button}
              onPress={this.signInWithFacebook}
              titleStyle={{fontWeight: 'bold'}}
              icon={<Icon name="facebook-square" size={25} color="white" />}
            />
            <Button
              title="Continue with email"
              buttonStyle={{
                ...styles.button,
                backgroundColor: 'mediumseagreen',
              }}
              titleStyle={{fontWeight: 'bold'}}
              icon={<Icon name="envelope" size={20} color="white" />}
              onPress={this.navigate.bind(this, 'SignUp')}
            />
            <View>
              <Text
                onPress={this.navigate.bind(this, 'SignIn')}
                style={styles.linkTextContainer}>
                Already a member? 
                <Text style={{fontWeight: 'bold'}}> Sign in</Text>
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  h1: {
    color: '#FFF',
    fontSize: 50,
    fontWeight: 'bold',
  },
  h2: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 8,
  },
  image: {
    width: 300,
    height: 260,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },
  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    width: '90%',
    margin: 20,
    padding: 10,
  },
  linkTextContainer: {
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
  button: {
    margin: 5,
    borderRadius: 20,
  },
});

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onSignInWithFacebook: () => {
    dispatch(
      signIn({
        email: null,
        password: null,
        provider: "facebook"
      })
    );
  },

  onDismissAuthError: () => {
    dispatch(dismissAuthError());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
