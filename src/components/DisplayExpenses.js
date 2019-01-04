import React, { Component } from "react";
import firebase from "firebase";

export default class DisplayExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      totalExpense: 0
    };
  }

  componentDidMount() {
    const expensesRef = firebase.database().ref("expenses");
    expensesRef.on("value", snapshot => {
      let expenses = snapshot.val();
      let newExpenses = [];
      for (let expense in expenses) {
        this.setState({
          totalExpense:
            parseFloat(this.state.totalExpense) +
            parseFloat(expenses[expense].price)
        });
        newExpenses.push({
          id: expense,
          store: expenses[expense].store,
          item: expenses[expense].item,
          price: expenses[expense].price,
          createDate: expenses[expense].date_added
        });
      }
      this.setState({ expenses: newExpenses });
    });
  }

  renderExpenses() {
    return (
      <tbody>
        {this.state.expenses.map(expense => {
          return (
            <tr key={expense.id}>
              <td>{expense.store}</td>
              <td>{expense.item}</td>
              <td>{expense.price}</td>
              <td>{expense.createDate}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    return (
      <section className="display-item">
        <h2>Expenses</h2>
        <div className="wrapper">
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Store</th>
                <th>Item</th>
                <th>Price</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            {this.renderExpenses()}
          </table>
          <hr />
          <h4>Total Expense: ${this.state.totalExpense}</h4>
        </div>
      </section>
    );
  }
}
