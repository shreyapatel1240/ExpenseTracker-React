import React, { Component } from "react";
import firebase from "firebase";
import fuzzyFilterFactory from "react-fuzzy-filter";

const { InputFilter, FilterResults } = fuzzyFilterFactory();

export default class DisplayProductInStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    const productInStoresRef = firebase.database().ref("products");
    productInStoresRef.on("value", snapshot => {
      let products = snapshot.val();
      let newProducts = [];
      for (let product in products) {
        newProducts.push({
          id: product,
          store: products[product].store,
          product: products[product].product,
          price: products[product].price,
          weight: products[product].weight
        });
      }
      this.setState({ products: newProducts });
    });
  }

  renderProducts() {
    const fuseConfig = {
      keys: ["id", "store", "product", "price", "weight"]
    };
    //return this.state.products.map(product => {
    return (
      <tbody>
        <tr>
          <td>
            <InputFilter debounceTime={200} />
          </td>
          <td>
            <InputFilter debounceTime={200} />
          </td>
          <td>
            <InputFilter debounceTime={200} />
          </td>
          <td>
            <InputFilter debounceTime={200} />
          </td>
        </tr>

        <FilterResults items={this.state.products} fuseConfig={fuseConfig}>
          {filteredItems => {
            return filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.store}</td>
                <td>{item.product}</td>
                <td>{item.weight}</td>
                <td>{item.price}</td>
              </tr>
            ));
          }}
        </FilterResults>
      </tbody>
      /*<tr key={product.id}>
          <td>{product.store}</td>
          <td>{product.product}</td>
          <td>{product.weight}</td>
          <td>{product.price}</td>
        </tr>*/
    );
    //});
  }

  render() {
    return (
      <section className="display-item">
        <h2>Products</h2>
        <div className="wrapper">
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Store</th>
                <th>Product</th>
                <th>Weight</th>
                <th>Price</th>
              </tr>
            </thead>

            {this.renderProducts()}
          </table>
        </div>
      </section>
    );
  }
}
