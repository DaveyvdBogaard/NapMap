import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import ProductsCard from './ProductCard';

class ProductList extends React.Component<any> {
  state = {
    search: '',
    refreshing: false,
  };

  componentDidMount() {
    this.props.onFetchAllProducts();
  }

  updateSearch = (search: any) => {
    this.setState({search});
  };

  fetchProducts() {
    this.props.onFetchAllProducts();
  }

  onRefresh = () => {
    this.fetchProducts();
  };

  getProducts = () => {
    if (this.props.products === null || this.props.products === undefined) {
      return (
        <View style={styles.noProductsContainer}>
          <Text>No products</Text>
          <Button />
        </View>
      );
    } else {
      return this.props.products.map(
        (product: any, index: string | number | undefined) => {
          return <ProductsCard key={index} product={product} />;
        },
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.onRefresh}
            />
          }>
          {this.getProducts()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
  },
  noProductsContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapDispatchToProps = () => ({
  onFetchAllProducts: () => {
    // dispatch(fetchProducts());
  },
});

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
