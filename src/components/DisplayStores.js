import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";

export default class DisplayStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
    };
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
      }
      this.setState({ stores: newStores });
    });
  }

  removeStore(storeId) {
    const storeRef = firebase.database().ref(`/stores/${storeId}`);
    storeRef.remove();
  }

  renderStores() {
    return (
      <tbody>
        {this.state.stores.map(store => {
          return (
            <tr key={store.id}>
              <td>
                <Link to={`/store/update/${store.id}`}>{store.store}</Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={event => this.removeStore(store.id)}
                >
                  <i className="glyphicon glyphicon-trash" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    return (
      <section className="display-item">
        <h2>Stores</h2>
        <div className="wrapper">
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Store</th>
                <th>Delete</th>
              </tr>
            </thead>
            {this.renderStores()}
          </table>
        </div>
      </section>
    );
  }
}
