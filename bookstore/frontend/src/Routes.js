import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import BookAdministration from "./components/BooksAdministration";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import Default from "./components/pages/Default";
import Modal from "./components/Modal";
import DeleteModal from "./components/DeleteModal";
import UpdateModal from "./components/UpdateModal";
import GlobalStyle from './styles/global';

import { isAuthenticated, isAdminAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdminAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={ProductList} />
      <Route path='/details' component={Details} />
      {/* <Route path='/details' component={props=><Details {...props} />} /> */}
      <PrivateRoute path="/cart" component={Cart} />
      <AdminRoute path="/booksAdministration" component={BookAdministration} />
      <Route path="/aboutUs" component={AboutUs} />
      <Route path="/contactUs" component={ContactUs} />
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route component={Default} />
    </Switch>
    <Modal />
    <DeleteModal />
    <UpdateModal />
    <GlobalStyle />
  </BrowserRouter>
);

export default Routes;