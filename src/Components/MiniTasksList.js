import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import firebase from "firebase";
require("firebase/firestore");

export default class MiniTasksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };

    this.db = firebase.firestore();

    this.valueToColor = this.valueToColor.bind(this);
  }

  componentDidMount() {
    var array = [];
    this.props.tasks.forEach(task => {
      this.db.doc(`tasks/${task.task}`).get().then(doc => {
        const data = doc.data();
        array.push({
          name: data.title,
          description: data.description,
          progress: data.progress,
          initialValue: task.value
        });
        this.setState({
          tasks: array
        });
      });
    });
  }

  valueToColor(value) {
    if (value === 0) {
      return "#FF8888";
    } else if (value < 0.25) {
      return "#FFBF71";
    } else if (value < 0.5) {
      return "#FFF48B";
    } else if (value < 0.75) {
      return "#A8CDFF";
    } else if (value < 1) {
      return "#9096FF";
    } else {
      return "#ABFFB4";
    }
  }

  render() {
    return (
      <div>
        {this.state.tasks.map(task =>
          <Box>
            <Row>
              <Name>{task.name}</Name>
              <Circle size={8} color={this.valueToColor(task.initialValue)} />
            </Row>
            <Name
              style={{
                fontFamily: "Avenir-Roman, sans-serif",
                color: "#DCDCDC"
              }}
            >
              {task.description}
            </Name>
          </Box>
        )}
      </div>
    );
  }
}

const Box = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 5px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Name = styled.p`
  font-family: Avenir-Heavy, sans-serif;
  font-size: 12px;
  margin: 0
`;

const Circle = styled.div`
  ${props => `
    width: ${props.size}px;
    height: ${props.size}px;
    border-radius: 50%;
    background-color: ${props.color};
    margin-left: 10px;
    `}
  `;

MiniTasksList.propTypes = {
  tasks: PropTypes.array.isRequired
};
