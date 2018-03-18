import React, { Component } from "react";
import styled from "styled-components";
import firebase from "firebase";
import SpringCell from "./SpringCell";
require("firebase/firestore");

export default class BoardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      springs: []
    };

    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.db.collection("groups/robotics/instances").get().then(snapShot => {
      var array = [];
      snapShot.forEach(doc => {
        const data = doc.data();
        array.push({
          at: data.at,
          closed: data.closed ? data.closed : false,
          completed: data.completed ? data.completed : false,
          id: data.id,
          tasks: data.tasks
        });
      });
      this.setState({
        springs: array
      });
    });
  }

  render() {
    return (
      <div>
        <Row>
          <MainText>Springs</MainText>
          <Circle
            onClick={() => (window.location.href = "/spring")}
            size={25}
            color={"#FAFAFA"}
          />
        </Row>
        <Row style={{ alignItems: "flex-start" }}>
          {this.state.springs.map(spring => <SpringCell spring={spring} />)}
        </Row>
      </div>
    );
  }
}

const MainText = styled.p`
  font-family: Avenir-Black, sans-serif;
  font-size: 36px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;

  ${props => `
    width: ${props.size}px;
    height: ${props.size}px;
    border-radius: 50%;
    background-color: ${props.color};
    `}
  `;

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
  `;
