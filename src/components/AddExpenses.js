import React, { Component } from "react";
import firebase from "../firebase";

export default class AddExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: "",
      item: "",
      price: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ store: `${document.getElementById("store").value}` });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var createDate = new Date();
    createDate = `${createDate.getMonth() +
      1}/${createDate.getDate()}/${createDate.getFullYear()}`;
    const expensesRef = firebase.database().ref("expenses");
    const expenses = {
      store: this.state.store,
      item: this.state.item,
      price: this.state.price,
      date_added: createDate
    };
    expensesRef.push(expenses);
    this.setState({
      store: "",
      item: "",
      price: 0
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add Expenses</h2>
        <div className="from-group">
          <label htmlFor="store">Select Store</label>
          <select
            value={this.state.store}
            className="form-control"
            id="store"
            onChange={this.handleChange}
          >
            <option value="NoFrills" defaultValue>
              No Frills
            </option>
            <option value="ShoppersDrugmart">Shopper's DrugMart</option>
            <option value="MirchMasala">Mirch Masala</option>
            <option value="PatelBrothers">Patel Brothers</option>
            <option value="Wallmart">Wallmart</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="item">Item</label>
          <input
            type="text"
            className="form-control"
            id="item"
            placeholder="Enter Item"
            value={this.state.item}
            onChange={this.handleChange}
            required
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
