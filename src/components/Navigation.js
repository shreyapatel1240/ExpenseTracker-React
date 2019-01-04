import React from "react";
import "../css/Navigation.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/expenses/add">Expenses</Link>
        </li>
        <li>
          <Link to="/store/add">Add Store</Link>
        </li>
        <li>
          <Link to="/product/stores/add">
            <Button variant="contained" color="primary">
              Product in Stores
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
