import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../../assets/logo.svg";

import api from "../../services/api";

import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    console.log("estou em handleSignup");
    
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Please fill in all the details to register." });
    } else {
      try {
        await api.post("/api/auth/register", { name: username, email, password });
        this.props.history.push("/login");
      } catch (err) {
        console.log(err);
        this.setState({ error: "There was an error registering your account." });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={logo} alt="Bookstore logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Username"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Register</button>
          <hr />
          <Link to="/login">Already registered? Sign In</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);