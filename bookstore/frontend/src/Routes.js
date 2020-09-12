import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import ProductList from "./pages/Home/ProductList";
import Details from "./pages/BookDetails/Details";
import Cart from "./pages/Cart";
import BookAdministration from "./pages/BookAdministration/BooksAdministration";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Default from "./pages/NotFound/Default";
import Modal from "./pages/Home/Modal";
import DeleteModal from "./pages/BookAdministration/DeleteModal";
import UpdateModal from "./pages/BookAdministration/UpdateModal";
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