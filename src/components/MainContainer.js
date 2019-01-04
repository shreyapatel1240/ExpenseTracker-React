import React from "react";
import { Switch, Route } from "react-router-dom";
import Expenses from "./Expenses";
import AddStore from "./AddStore";
import ProductStores from "./ProductStores";
import "../css/MainContainer.css";

const MainContainer = () => {
  return (
    <main className="container">
      <Switch>
        <Route exact path="/" component={Expenses} />
        <Route path="/expenses/add" component={Expenses} />
        <Route path="/store/add" component={AddStore} />
        <Route path="/store/update/:id" component={AddStore} />
        <Route path="/product/stores/add" component={ProductStores} />
      </Switch>
    </main>
  );
};

export default MainContainer;
