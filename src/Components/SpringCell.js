import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
import MiniTasksList from "./MiniTasksList";

export default class SpringCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Spring color={this.props.spring.completed ? "#F6F6F6" : "#E8F2FF"}>
        <DateText color={this.props.spring.completed ? "#000" : "#000"}>
          {this.props.spring.id}
        </DateText>
        <DateText
          style={{
            fontFamily: "Avenir-Roman, sans-serif",
            fontSize: 14
          }}
          color={this.props.spring.completed ? "#DCDCDC" : "#99B1D1"}
        >
          {moment(this.props.spring.at, "MMMM Do, h:mm:ss a").format("MMMM Do")}
        </DateText>
        <MiniTasksList tasks={this.props.spring.tasks} />
      </Spring>
    );
  }
}

const Spring = styled.div`
  border-radius: 8px;
  width: 200px;
  padding: 10px;
  margin-right: 15px;

  ${props => `
    background-color: ${props.color}`}
`;

const DateText = styled.p`
  font-family: Avenir-Heavy, sans-serif;
  font-size: 16;
  margin: 5px;
  ${props => `
      color: ${props.color}`}
  `;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => `
    width: ${props.size}px;
    height: ${props.size}px;
    border-radius: 50%;
    background-color: ${props.color};
    `}
  `;

SpringCell.propTypes = {
  spring: PropTypes.object.isRequired
};
