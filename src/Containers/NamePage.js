import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import PropTypes from "prop-types";
require("firebase/firestore");

export default class PinPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.db = firebase.firestore();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.db.doc(`groups/${this.props.group}`).get().then(res => {
      const data = res.data();
      this.setState({
        name: data.name
      });
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    this.props.submit(this.state.user);
  }

  render() {
    return (
      <Main>
        {this.state.name.length > 0 && <Header>{this.state.name}</Header>}
        <Text>Enter a name to join the Springboard!</Text>
        <Input
          autoCapitalize="characters"
          onChange={this.handleChange}
          name="user"
        />
        <Submit onClick={this.handleSubmit}>Join</Submit>
      </Main>
    );
  }
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px;
`;

const Input = styled.input`
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0px 0px 20px #E9E9E9;
  padding: 16px;
  border: solid #F2F2F2 2px;
  margin: 5px;

  &:focus {
    outline: 0;
  }
`;

const Submit = styled.button`
  background-color: #4A4FFF;
  padding: 10px;
  border-radius: 20px;
  border-color: transparent;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  width: 200px;
  color: #fff;
  margin: 30px;
  box-shadow: 0px 0px 20px #8084FF;

  &:focus {
    outline: 0;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Text = styled.p`
  font-family: PT Sans, sans-serif;
  font-size: 16px;
  text-align: center;
  color: #DCDCDC;
  margin-top: 10px;
`;

const Header = styled.p`
  font-family: Abril Fatface, cursive;
  font-size: 24px;
  margin-bottom: 10px;
`;

PinPage.propTypes = {
  submit: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
  pin: PropTypes.string.isRequired
};
