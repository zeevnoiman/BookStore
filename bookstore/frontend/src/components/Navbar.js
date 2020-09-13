import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo.svg";
import contactUsImg from "../assets/contact-us.svg";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from '../context';

export default function Navbar() {
    const [responsive, setResponsive] = useState('');
    
    function turnOnResponsive(){
        if(responsive.length > 0){
            setResponsive('');
            return;
        }
        setResponsive('responsive') 
    };
    
    return (
        <ProductConsumer>
            {value => {
                const { username, role, isAuthenticated, logout } = value;
                return (
                    <Nav className="navbar">
                        <Link className="logo-image" to="/" >
                            <img src={logo} alt="store" className="navbar-brand" />
                        </Link>
                        <div className="hamburgerButton" onClick={() => turnOnResponsive()}>
                          <div class="bar1"></div>
                          <div class="bar2"></div>
                          <div class="bar3"></div>
                        </div>
                        <div id="navbarNavDropdown" className="navbar-options">
                            <ul className={"navbar-nav " + responsive}>
                                <li className="nav-item ">
                                    <Link to="/" className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                {role === 'admin' &&
                                    <li className="nav-item ">
                                        <Link to="/booksAdministration" className="nav-link">
                                            Books Administration
                                        </Link>
                                    </li>
                                }
                                <li className="nav-item ">
                                    <Link to="/aboutUs" className="nav-link">
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link to="/contactUs" className="nav-link ">
                                        Contact Us
                                    </Link>
                                </li>

                                {isAuthenticated &&
                                    <li className="nav-item welcome-username">
                                        <h2 className="text-capitalize font-weight-bold text-white">
                                            Welcome <strong>{username}</strong>
                                        </h2>
                                    </li>
                                }

                            </ul>
                            {!isAuthenticated ? (
                                <ul className="navbar-nav-actions">
                                    <li className="nav-action-item">
                                        <Link to="/login" className="navbar-actions">
                                            <ButtonContainer>
                                                Login
                                            </ButtonContainer>
                                        </Link>
                                    </li>
                                    <li className="nav-action-item">
                                        <Link to="/signup" className="navbar-actions ">
                                            <ButtonContainer>
                                                Sign Up
                                    </ButtonContainer>
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                    <ul className="navbar-nav-actions">
                                        <li className="nav-action-item">
                                            <Link to="/" className="navbar-actions ">
                                                <ButtonContainer onClick={() => { logout() }}>
                                                    Logout
                                                </ButtonContainer>
                                            </Link>
                                        </li>
                                        <li className="nav-action-item">
                                            <Link to="/cart" className="navbar-actions">
                                                <ButtonContainer>
                                                    <span className="mr-2">
                                                        <i className="fas fa-cart-plus " />
                                                    </span>
                                                    my cart
                                                </ButtonContainer>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                        </div>
                    </Nav>
                );
            }}
        </ProductConsumer>
    )
}

const Nav = styled.nav`
    background: var(--mainBlue);
    .navbar{
        display: flex;
        flex-direction: row;
    }
    .hamburgerButton {
        display:none
        cursor: pointer;
      }
      
      .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: #333;
        margin: 6px 0;
        transition: 0.4s;
      }
    .navbar-options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-item: center;
        width: 90%;
    }
    .navbar-nav{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .nav-item {
        margin-right: 30px;
    }
    .navbar-nav-actions{
        display: flex;
        flex-direction: row;
        list-style: none;
        align-items: center
    }
    .nav-action-item{
        margin-right: 10px;
    }
    .welcome-username {
        padding-left: 80px;
        font-size:1.2rem;
    }
    .navbar-actions{
        color: var(--mainWhite) !important;
        font-size:1.2rem;
        text-transform:capitalize;
        right: 20px;
    }
    .nav-link {
        color: var(--mainWhite) !important;
        font-size:1.2rem;
        text-transform:capitalize;
        padding: 0 10px 0 10px;
        border: solid 1px var(--mainBlue);
        border-radius: 8px;
    }
    .nav-link:hover{
        border:solid 1px var(--lightBlue);
    }
    @media (max-width: 1024px) {
        .nav-item {
            margin-right: 10px;
        }

        .welcome-username {
            padding-left: 30px;
        }
    @media (max-width: 780px) {
        .welcome-username {
           display: none;
        }
    @media (max-width: 600px) {
        .navbar-nav {
           display: none;
        }
        .hamburgerButton {
            display: inline-block;
            cursor: pointer;
          }
          .logo-image{
              display: none;
          }
          .navbar-options{
              justify-content: flex-end
          }
          .navbar-nav.responsive{
            display: flex;
            position: absolute;
            flex-direction: column;
            left: 0px;
            background: var(--mainBlue);
            align-items: flex-start;
            top: 60px;
            list-style: none;
            width: 50%;
            padding-top: 10px;
            opacity: 50%;
           }
        
`;