import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import TasksList from "../Components/TasksList";
import BoardList from "../Components/BoardList";
require("firebase/firestore");
require("firebase/auth");

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.db = firebase.firestore();
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <TasksList />
        <BoardList />
      </div>
    );
  }
}
