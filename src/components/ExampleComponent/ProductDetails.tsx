import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {Image, Button} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

class ProductDetails extends React.Component<any> {
  state = {
    animation: new Animated.Value(0),
  };
  product: any;
  screenHeight = Dimensions.get('window').height;
  backdrop = {
    transform: [
      {
        translateY: this.state.animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [this.screenHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: this.state.animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };
  slideUp = {
    transform: [
      {
        translateY: this.state.animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [0, -1 * this.screenHeight],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  payProduct = (product: any, userRef: any) => {
    this.props.onPayProduct({
      product: product, 
      userRef: userRef
    });
  }

  constructor(props: any) {
    super(props);
    this.product = this.props.route.params.product;
    this.product.provider = this.product.provider.then((provider: any) => {
      return provider;
    });
  }

  handleOpen = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  buyActionSheet = () => {
    return (
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.cover, this.backdrop]}>
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, this.slideUp]}>
            <TouchableOpacity onPress={this.handleClose} style={styles.cross}>
              <Icon name="close" size={20} color='#000'/>
            </TouchableOpacity>
            {/* <Scroller /> */}
            <View style={styles.backdropInfo}>

            </View>
            <View style={styles.backdropButton}>
                <Button buttonStyle={{
                    marginBottom: 10,
                    backgroundColor: '#008F68',
                    borderRadius: 20
                }}
                title="Pay"
                loading={this.props.paymentLoading}
                onPress={this.payProduct.bind(this, this.product, this.props.userRef)}
                />
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: this.product.image}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.middleContainer}>
          <ScrollView>
            <View style={styles.infoContainer}>
              <Text>{this.product.description}</Text>
            </View>
            <View style={styles.providerContainer}>
              <Text>{this.product.description}</Text>
            </View>
            <View style={styles.reviewContainer}>
              <Text>{this.product.description}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={{
              borderRadius: 20,
              padding: 10,
              backgroundColor: '#008F68',
            }}
            title='Proceed to payment'
            onPress={this.handleOpen}
          />
        </View>
        <this.buyActionSheet />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onPayProduct: (payload: any) => {
  },
 
});

const mapStateToProps = (state: any) => {
  return {
      paymentLoading: state.products.loading,
      userRef: 'Ldm7v7Rg6ChWiTWNXGEM',
  };
};

const styles = StyleSheet.create({
  infoContainer: {
    height: 100,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  providerContainer: {
    height: 100,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  reviewContainer: {
    height: 100,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  middleContainer: {
    flex: 3,
    width: '100%',
  },
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  sheet: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    minHeight: 80,
  },
  cross: {
      marginBottom: 10,
      textAlign: "right",
      alignContent: "flex-end",
      alignItems: "flex-end",
      paddingRight: 5
  },
  backdropInfo: {
      height: 80
  },
  backdropButton: {
      marginBottom: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
