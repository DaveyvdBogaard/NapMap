import { Text, View, SafeAreaView } from "react-native"
import React from "react";
import { Button } from "react-native-elements";
import { signOut } from "../actions";
import { connect } from "react-redux";

class MapScreen extends React.Component<any> {
  render() {
    return (
      <SafeAreaView>
          
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  
});

const mapStateToProps = (state: any) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);