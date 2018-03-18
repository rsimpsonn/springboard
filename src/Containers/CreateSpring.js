import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import SelectionTaskCell from "../Components/SelectionTaskCell";
import SpringCell from "../Components/SpringCell";
import moment from "moment";
const emoji = require("emoji-dictionary");
require("firebase/firestore");

export default class CreateSpring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      selected: [],
      next: false
    };

    this.db = firebase.firestore();

    this.selectTask = this.selectTask.bind(this);
    this.submit = this.submit.bind(this);
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

  selectTask(task) {
    if (this.state.selected.findIndex(i => i.task === task.task) === -1) {
      this.state.selected.push(task);
    } else {
      this.state.selected.splice(
        this.state.selected.findIndex(i => i.task === task.task),
        1
      );
    }
  }

  submit() {
    this.db
      .collection("groups/robotics/instances")
      .add({
        at: moment().format("MMMM Do, h:mm:ss a"),
        completed: false,
        id: "SHR002",
        tasks: this.state.selected
      })
      .then(() => (window.location.href = "/"));
  }

  render() {
    return (
      <div>
        {!this.state.next &&
          <MainView>
            <MainText>Create a Spring</MainText>
            <SubText>What progress do you want to make?</SubText>
            <MainView style={{ flexFlow: "row wrap" }}>
              {this.state.tasks.map(task =>
                <SelectionTaskCell selection={this.selectTask} task={task} />
              )}
            </MainView>
            <img
              style={{
                width: 25,
                height: "auto",
                opacity: 1,
                position: "absolute",
                bottom: 35
              }}
              onClick={() => this.setState({ next: true })}
              src={require("../images/arrow.png")}
            />
          </MainView>}
        {this.state.next &&
          <MainView>
            <MainText>Ready to open SHR002?</MainText>
            <div style={{ marginTop: 50 }}>
              <SpringCell
                spring={{
                  completed: false,
                  id: "SHR002",
                  at: "March 18th, 1:00 pm",
                  tasks: this.state.selected
                }}
              />
            </div>
            <Submit onClick={this.submit}>
              {emoji.getUnicode("rocket")}Launch
            </Submit>
          </MainView>}
      </div>
    );
  }
}

const MainText = styled.p`
  font-family: Avenir-Black, sans-serif;
  font-size: 36px;
  margin-bottom: 0px;
`;

const SubText = styled.p`
  font-family: Avenir-Roman, sans-serif;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 25px;
  color: #DCDCDC;
`;

const Submit = styled.p`
  font-family: Avenir-Roman, sans-serif;
  font-size: 16px;
  color: #739EFF;
  margin-top: 35px;
  cursor: pointer;

  &:active {
    opacity: 0.5;
  }
`;

const MainView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
`;
