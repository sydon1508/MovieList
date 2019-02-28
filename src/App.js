import React, { Component } from "react";

import "./App.css";
import Header from "./Common/header/Header";
import List from "./list/List";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <List />
      </div>
    );
  }
}

export default App;
