import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import PropTypes from "prop-types";

import Online from "../Components/Online";
require("firebase/firestore");

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: ""
    };

    this.db = firebase.firestore();
    this.tasksRef = this.db.collection(`groups/${this.props.group}/tasks`);
  }

  componentDidMount() {
    this.db.doc(`groups/${this.props.group}`).get().then(res => {
      const data = res.data();
      this.setState({
        name: data.name,
        description: data.description
      });
    });
  }

  render() {
    return (
      <Main>
        <Row>
          <Icon src={require("../images/robot.png")} />
          <Column>
            <Row>
              <Header>{this.state.name}</Header>
              <Online pin={this.props.pin} group={this.props.group} />
            </Row>
            <Description>{this.state.description}</Description>
          </Column>
        </Row>
        <Pin>{this.props.pin}</Pin>
      </Main>
    );
  }
}

const Header = styled.p`
  font-family: Avenir-Heavy, sans-serif;
  font-size: 28px;
  margin-bottom: 0;
  margin-top: 0;
`;

const Description = styled.p`
  font-family: Avenir-Roman, sans-serif;
  font-size: 14px;
  background-color: #F6F6F6;
  padding: 8px;
  border-radius: 6px;
  margin-top: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const Main = styled.div`
  justify-content: flex-start;
  padding: 20px;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const Pin = styled.p`
  padding: 20px;
  background-color: #F6F6F6;
  font-family: Avenir-Heavy, sans-serif;
  font-size: 30px;
  border-radius: 6px;
  position: absolute;
  right: 25px;
  top: 0;
`;

MainPage.propTypes = {
  pin: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
