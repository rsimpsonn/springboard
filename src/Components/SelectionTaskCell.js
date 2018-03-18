import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressSelector from "./ProgressSelector";

export default class SelectionTaskCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      hover: false,
      progress: this.props.task.progress
    };

    this.progressPalette = this.progressPalette.bind(this);
    this.select = this.select.bind(this);
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

  select(value) {
    this.setState({ hover: false, progress: value });
    this.props.selection({ value: value, task: this.props.task.key });
    if (value !== this.props.task.progress) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
  }

  render() {
    return (
      <MainView color={this.state.selected ? "#F3F8FF" : "#FAFAFA"}>
        <MainText>
          {this.props.task.name}
        </MainText>
        <Column>
          <SubText>From</SubText>
          <ProgressBox
            bg={this.progressPalette(this.props.task.progress, true, false)}
          >
            <Progress
              color={this.progressPalette(
                this.props.task.progress,
                false,
                false
              )}
            >
              {this.progressPalette(this.props.task.progress, true, true)}
            </Progress>
          </ProgressBox>
        </Column>
        <Column>
          <SubText>To</SubText>
          <ProgressBox
            onClick={() => this.setState({ hover: !this.state.hover })}
            bg={this.progressPalette(this.state.progress, true, false)}
          >
            <Progress
              color={this.progressPalette(this.state.progress, false, false)}
            >
              {this.progressPalette(this.state.progress, true, true)}
            </Progress>
          </ProgressBox>
          {this.state.hover &&
            <ProgressSelector
              progress={this.props.task.progress}
              selection={this.select}
            />}
        </Column>
      </MainView>
    );
  }
}

const MainView = styled.div`
display: flex;
  border-radius: 6px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 15px;
  width: 300px;
  height: 200px;

  ${props => `
    background-color: ${props.color}`}
`;

const MainText = styled.p`
  font-family: Avenir-Roman, sans-serif;
  font-size: 20px;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5px;
`;

const SubText = styled.p`
  color: #DCDCDC;
  font-family: Avenir-Roman, sans-serif;
  font-size: 14px;
  margin: 0;
`;

const ProgressBox = styled.div`
display: flex;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  height: 25px;

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

SelectionTaskCell.propTypes = {
  task: PropTypes.object.isRequired,
  selection: PropTypes.func.isRequired
};
