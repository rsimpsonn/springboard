import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import TaskCell from "./TaskCell";
require("firebase/firestore");

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };

    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.db.collection("tasks").get().then(snapShot => {
      var array = [];
      snapShot.forEach(doc => {
        const data = doc.data();
        array.push({
          name: data.title,
          description: data.description,
          users: data.users,
          date: data.formattedDate,
          progress: data.progress,
          diff: data.difficulty,
          users: data.users,
          key: doc.id
        });
      });
      this.setState({
        tasks: array
      });
    });
  }

  render() {
    return (
      <div>
        <MainText>Open Tasks</MainText>
        {this.state.tasks.map(task => <TaskCell task={task} />)}
      </div>
    );
  }
}

const MainText = styled.p`
  font-family: Avenir-Black, sans-serif;
  font-size: 36px;
  margin-bottom: 10px;
`;
