import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../../assets/logo.svg";

import { Form, Container } from "./styles";
import { ProductConsumer } from '../../context';

class SignIn extends Component {

  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <ProductConsumer>
        {value => {
          const { login, loginError } = value;

          return (
            <Container>
              <Form onSubmit={async e =>
                 { e.preventDefault();
                  const logged = await login(this.state.email, this.state.password);
                  if(logged){
                    this.props.history.push("/");
                  }
                   }}>
                <img src={logo} alt="Bookstore logo" />
                {loginError && <p>{loginError}</p>}
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
                <button type="submit">Login</button>
                <hr />
                <Link to="/signup">Not a member? Register Here</Link>
              </Form>
            </Container>
          );
        }}
      </ProductConsumer>
    );
  }
}

// Só reforçando que o withRouter é um HOC que adiciona a propriedade history que possibilita mudar de página.
export default withRouter(SignIn);
