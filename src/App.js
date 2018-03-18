import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import * as firebase from "firebase";
import PinPage from "./Containers/PinPage";
import MainPage from "./Containers/MainPage";
import CreateSpring from "./Containers/CreateSpring";
import HomePage from "./Containers/HomePage";
import "./App.css";
require("firebase/firestore");

class App extends Component {
  constructor(props) {
    super(props);

    const config = {
      apiKey: "AIzaSyCd74YfgTGlQXroWUH-2NeguPkFRH5AHnA",
      authDomain: "bonfire-35073.firebaseapp.com",
      databaseURL: "https://bonfire-35073.firebaseio.com",
      projectId: "bonfire-35073",
      storageBucket: "bonfire-35073.appspot.com",
      messagingSenderId: "974970721644"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/spring" component={CreateSpring} />
        </Switch>
      </div>
    );
  }
}

export default App;
