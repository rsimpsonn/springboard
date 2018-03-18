import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default class ProgressSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: this.props.progress
    };

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

  changeValue(value) {
    this.props.selection(value);
    this.setState({
      progress: value
    });
  }

  render() {
    return (
      <MainView>
        {this.props.progress === 0 &&
          <ProgressBox
            style={{ opacity: this.state.progress === 0 ? 1 : 0.4 }}
            bg={this.progressPalette(0, true, false)}
            onClick={() => this.changeValue(0)}
          >
            <Progress color={this.progressPalette(0, false, false)}>
              {this.progressPalette(0, true, true)}
            </Progress>
          </ProgressBox>}
        {this.props.progress <= 0.25 &&
          <ProgressBox
            style={{
              opacity: this.state.progress <= 0.25 && this.state.progress !== 0
                ? 1
                : 0.4
            }}
            onClick={() => this.changeValue(0.24)}
            bg={this.progressPalette(0.24, true, false)}
          >
            <Progress color={this.progressPalette(0.24, false, false)}>
              {this.progressPalette(0.24, true, true)}
            </Progress>
          </ProgressBox>}
        {this.props.progress <= 0.5 &&
          <ProgressBox
            style={{
              opacity: this.state.progress > 0.25 && this.state.progress <= 0.5
                ? 1
                : 0.4
            }}
            onClick={() => this.changeValue(0.49)}
            bg={this.progressPalette(0.49, true, false)}
          >
            <Progress color={this.progressPalette(0.49, false, false)}>
              {this.progressPalette(0.49, true, true)}
            </Progress>
          </ProgressBox>}
        {this.props.progress <= 0.75 &&
          <ProgressBox
            style={{
              opacity: this.state.progress > 0.5 && this.state.progress <= 0.75
                ? 1
                : 0.4
            }}
            onClick={() => this.changeValue(0.74)}
            bg={this.progressPalette(0.74, true, false)}
          >
            <Progress color={this.progressPalette(0.74, false, false)}>
              {this.progressPalette(0.74, true, true)}
            </Progress>
          </ProgressBox>}
        {this.props.progress <= 1 &&
          <ProgressBox
            style={{
              opacity: this.state.progress > 0.75 && this.state.progress < 1
                ? 1
                : 0.4
            }}
            onClick={() => this.changeValue(0.99)}
            bg={this.progressPalette(0.99, true, false)}
          >
            <Progress color={this.progressPalette(0.99, false, false)}>
              {this.progressPalette(0.99, true, true)}
            </Progress>
          </ProgressBox>}
        <ProgressBox
          style={{
            opacity: this.state.progress === 1 ? 1 : 0.4
          }}
          onClick={() => this.changeValue(1)}
          bg={this.progressPalette(1, true, false)}
        >
          <Progress color={this.progressPalette(1, false, false)}>
            {this.progressPalette(1, true, true)}
          </Progress>
        </ProgressBox>
      </MainView>
    );
  }
}

const MainView = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  position: absolute;
`;

const ProgressBox = styled.div`
display: flex;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin: 5px;

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
