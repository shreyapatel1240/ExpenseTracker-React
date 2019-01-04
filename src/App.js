import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import MainContainer from "./components/MainContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <MainContainer />
      </div>
    );
  }
}

export default App;
