import {
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Card, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigationRef } from '../../shared/NavigationService';

class ProductsCard extends React.Component<any> {
  navigate = (loc: any, props: any) => {
    navigationRef.current?.navigate(loc, props)
  }
  
  render() {
    return (
      <Card
        image={{uri: this.props.product.image}}
        containerStyle={styles.cardContainer}
        imageStyle={styles.cardImg}>
        <Text style={{marginBottom: 10}}>{this.props.product.description}</Text>
        <Button
          buttonStyle={{
            borderRadius: 20,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: '#008F68'
          }}
          title="More info"
          onPress={this.navigate.bind(this, 'ProductDetails', {productId: 'asdasd', product: this.props.product})}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
  },
  cardImg: {
    overflow: 'hidden',
  },
});

export default ProductsCard;
