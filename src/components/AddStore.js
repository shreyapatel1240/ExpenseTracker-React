import React, { Component } from "react";
import firebase from "firebase";
import DisplayStores from "./DisplayStores";

export default class AddStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: "",
      buttonText: "Save"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ buttonText: "Update" });
      const StoresUpdateRef = firebase.database().ref("stores");
      StoresUpdateRef.once("value", snapshot => {
        let updateStores = snapshot.val();
        for (let updateStore in updateStores) {
          if (updateStore === this.props.match.params.id) {
            this.setState({ store: updateStores[updateStore].store });
          }
        }
      });
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const StoresRef = firebase.database().ref("stores");
    const stores = {
      store: this.state.store
    };
    // Check if the store is already exist or not
    const StoresCheckRef = firebase.database().ref("stores");
    StoresCheckRef.once("value", snapshot => {
      let checkStores = snapshot.val();
      let storeFlag = 0;
      if (checkStores != null) {
        for (let checkStore in checkStores) {
          if (
            checkStores[checkStore].store.toLowerCase() ===
            this.state.store.toLocaleLowerCase()
          ) {
            alert("The store you are trying to add is already exist.");
            storeFlag = 1;
          }
        }
      }
      if (storeFlag === 0) {
        // if store is not exist in db add it.
        StoresRef.push(stores);
        this.setState({
          store: ""
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Add Store</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="from-group">
            <label htmlFor="store">Add Store</label>
            <input
              type="text"
              className="form-control"
              id="store"
              placeholder="Enter Store Name"
              value={this.state.store}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {this.state.buttonText}
          </button>
        </form>
        <DisplayStores />
      </div>
    );
  }
}
