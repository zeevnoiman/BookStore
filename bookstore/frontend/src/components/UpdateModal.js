import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
  
      handleChange(event) {
        this.setState({value: event.target.value});
      }
  
      handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { updateModalOpen, closeUpdateModal, updateItem } = value;
                    const { _id, image_url, title, price, author, publisher } = value.modalProduct;
                    if (!updateModalOpen) {
                        return null;
                    } else {
                        return (
                            <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div
                                            className="col-8 mx-auto col-md-6 col-lg-4 p-5 text-center text-capitalize"
                                            id="modal"
                                        >
                                            <h5>Change items price:</h5>
                                            <img src={image_url} className="img-fluid" alt="" />
                                            <h5>{title}</h5>
                                            <h5 className="text-muted">author : {author}</h5>
                                            <h5 className="text-muted">publisher : {publisher}</h5>                                       
                                            <label>
                                                <input type="text" placeholder="Define a Price" value={this.state.value} onChange={this.handleChange} />
                                            </label>                                     
                                            <Link to="/booksAdministration">
                                                <ButtonContainer
                                                    onClick={() => {
                                                        const newPrice = Number(this.state.value);
                                                        updateItem(_id, newPrice);
                                                        closeUpdateModal();
                                                    }}
                                                >
                                                    Confirm
                                                </ButtonContainer>
                                            </Link>
                                            <Link to="/booksAdministration">
                                                <ButtonContainer
                                                    onClick={() => {
                                                        closeUpdateModal();
                                                    }}
                                                >
                                                    CANCEL
                                                 </ButtonContainer>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </ModalContainer>
                        );
                    }
                }}
            </ProductConsumer>
        );
    }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
