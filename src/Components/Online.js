import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import PropTypes from "prop-types";
require("firebase/firestore");

export default class Online extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: []
    };

    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.db
      .collection(
        `groups/${this.props
          .group}/instances/${this.props.pin.toLowerCase()}/members`
      )
      .get()
      .then(snapShot => {
        console.log(this.props.group, this.props.pin);
        var members = [];
        snapShot.forEach(doc => {
          const data = doc.data();
          console.log(data);
          members.push({ name: data.name, online: data.online });
        });
        this.setState({
          members
        });
      });
  }

  render() {
    return (
      <div style={{ marginLeft: 15 }}>
        <Count
          onMouseOver={() => this.setState({ list: true })}
          onMouseOut={() => this.setState({ list: false })}
        >
          {this.state.members.map(member => member.online === true).length}
        </Count>
        {this.state.list &&
          <PopUp>
            {this.state.members.map(
              member => member.online && <Name>{member.name}</Name>
            )}
            {this.state.members.map(
              member =>
                !member.online &&
                <Name style={{ color: "#DCDCDC" }}>{member.name}</Name>
            )}
          </PopUp>}
      </div>
    );
  }
}

const Count = styled.p`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4A4FFF;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir-Heavy, sans-serif;
  font-size: 16px;
`;

const Name = styled.p`
  font-family: Avenir, sans-serif;
  font-size: 14px;
`;

const PopUp = styled.div`
  background-color: #fff;
  box-shadow: 0 0 5px #DCDCDC;
  border-radius: 6px;
  position: absolute;
  padding: 20px;
`;

Online.propTypes = {
  group: PropTypes.string.isRequired,
  pin: PropTypes.string.isRequired
};
