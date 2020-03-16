import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {navigationRef} from '../shared/NavigationService';
import {signIn, dismissAuthError} from '../actions';
import {connect} from 'react-redux';

class SignInScreen extends React.Component<any> {
  state = {
    email: '',
    password: '',
  };

  onEmailChange = (e: any) => {
    this.setState({
      email: e.target.value,
    });
  };

  onPasswordChange = (e: any) => {
    this.setState({
      password: e.target.value,
    });
  };

  goBack = () => {
    navigationRef.current?.goBack();
  };

  signIn = () => {
    this.props.onSignIn({
        email: this.state.email,
        password: this.state.password
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topContainer}>
          <Icon name="arrow-left" size={30} onPress={this.goBack} />
        </View>
        <View style={styles.middleContainer}>
          <Input
            label="Email"
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            value={this.state.email}
            onChange={this.onEmailChange}
            textContentType="emailAddress"
          />
          <Input
            containerStyle={styles.inputContainer}
            label="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
            textContentType="password"
          />
          <Button
            title="Sign In"
            buttonStyle={{
              ...styles.button,
              backgroundColor: 'mediumseagreen',
            }}
            titleStyle={{fontWeight: 'bold'}}
            onPress={this.signIn}
          />
        </View>
        <View></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  topContainer: {
    flex: 1,
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    padding: 10,
  },
  middleContainer: {
    flex: 3,
    width: '100%',
    padding: 15,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    width: '90%',
    margin: 20,
    padding: 10,
  },
  inputContainer: {
    margin: 10,
  },
  button: {
    margin: 5,
    borderRadius: 20,
  },
  input: {},
});

const mapDispatchToProps = (dispatch: any) => ({
  onSignIn: (payload: any) => {
    dispatch(
      signIn({
        email: payload.email,
        password: payload.password,
      }),
    );
  },

  onDismissAuthError: () => {
    dispatch(dismissAuthError());
  },
});

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
