import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default class TaskCell extends Component {
  constructor(props) {
    super(props);

    this.progressPalette = this.progressPalette.bind(this);
  }

  progressPalette(value, bg, name) {
    if (bg === true) {
      if (value === 0) {
        return name ? "Nothing done" : "#FF8888";
      } else if (value < 0.25) {
        return name ? "A lot to do" : "#FFBF71";
      } else if (value < 0.5) {
        return name ? "Getting there" : "#FFF48B";
      } else if (value < 0.75) {
        return name ? "Close" : "#A8CDFF";
      } else if (value < 1) {
        return name ? "Almost done" : "#9096FF";
      } else {
        return name ? "Done" : "#ABFFB4";
      }
    } else {
      if (value === 0) {
        return "#BD2424";
      } else if (value < 0.25) {
        return "#E88409";
      } else if (value < 0.5) {
        return "#D3C011";
      } else if (value < 0.75) {
        return "#276DCB";
      } else if (value < 1) {
        return "#575FEA";
      } else {
        return "#54CC61";
      }
    }
  }

  diffPalette(value, bg) {
    if (bg === true) {
      if (value === "Hard") {
        return "#E1BBFF";
      } else if (value === "Med") {
        return "#FF94B3";
      } else {
        return "#A6B7FF";
      }
    } else {
      if (value === "Hard") {
        return "#994ED4";
      } else if (value === "Med") {
        return "#D02858";
      } else {
        return "#5069D2";
      }
    }
  }

  render() {
    return (
      <Bar>
        <MainText>{this.props.task.name}</MainText>
        <DescText>{this.props.task.description}</DescText>
        <ProgressBox
          bg={this.progressPalette(this.props.task.progress, true, false)}
        >
          <Progress
            color={this.progressPalette(this.props.task.progress, false, false)}
          >
            {this.progressPalette(this.props.task.progress, true, true)}
          </Progress>
        </ProgressBox>
        <ProgressBox bg={this.diffPalette(this.props.task.diff, true)}>
          <Progress color={this.diffPalette(this.props.task.diff, false)}>
            {this.props.task.diff}
          </Progress>
        </ProgressBox>
      </Bar>
    );
  }
}

/* <p style={{ position: "absolute", right: 15 }}>
  {this.props.task.users.map(user => user.firstName)}
</p> */

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-width: 2px 2px 0 2px;
  border-color: #F6F6F6;
  border-style: solid;
`;

const MainText = styled.p`
  font-family: Avenir-Heavy, sans-serif;
  font-size: 14px;
  margin-right: 15px;
  margin-left: 15px;
  `;

const DescText = styled.p`
  font-family: Avenir-Roman, sans-serif;
  font-size: 14px;
  color: #DCDCDC;
  margin-right: 15px;
`;

const ProgressBox = styled.div`
display: flex;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin-right: 15px;

  ${props => `
    background-color: ${props.bg}`}
`;

const Progress = styled.p`
font-family: Avenir-Heavy, sans-serif;
font-size: 14px;
margin: 10px;
${props => `
    color: ${props.color}`}
  `;

TaskCell.propTypes = {
  task: PropTypes.object.isRequired,
  selection: PropTypes.func
};

TaskCell.defaultPropTypes = {
  selection: null
};
