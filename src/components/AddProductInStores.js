import React, { Component } from "react";
import firebase from "firebase";

export default class AddProductInStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      store: "",
      weight: "",
      price: 0,
      stores: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const storesRef = firebase.database().ref("stores");
    storesRef.on("value", snapshot => {
      let stores = snapshot.val();
      let newStores = [];
      for (let store in stores) {
        newStores.push({
          id: store,
          store: stores[store].store
        });
        console.log(this.state.store);
        if (this.state.store !== "") {
          console.log("123");
          this.setState({ store: store });
        }
      }
      console.log(this.state.store);
      this.setState({ stores: newStores });
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const productInStoresRef = firebase.database().ref("products");
    const products = {
      product: this.state.product,
      store: this.state.store,
      weight: this.state.weight,
      price: this.state.price
    };
    productInStoresRef.push(products);
    this.setState({
      product: "",
      store: document.getElementById("store").value,
      weight: "",
      price: 0
    });
  }

  renderOptions() {
    return this.state.stores.map(store => (
      <option key={store.id} value={store.id}>
        {store.store}
      </option>
    ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add Product In Stores</h2>
        <div className="from-group">
          <label htmlFor="store">Select Store</label>
          <select
            value={this.state.store}
            className="form-control"
            id="store"
            onChange={this.handleChange}
          >
            {this.renderOptions()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product">Product</label>
          <input
            type="text"
            className="form-control"
            id="product"
            placeholder="Enter Product Name"
            value={this.state.product}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            placeholder="Enter Weight of the Product"
            value={this.state.weight}
            onChange={this.handleChange}
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter Price"
            value={this.state.price}
            onChange={this.handleChange}
            min="0.01"
            step="0.01"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}
