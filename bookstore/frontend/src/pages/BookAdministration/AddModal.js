import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../../context";
import { ButtonContainer } from "../../components/Button";
import { Link } from "react-router-dom";
import BookToAdd from "./BookToAdd";

export default class AddModal extends Component {

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
                    const { addModalOpen, closeAddModal, addNewBook } = value;
                    const {authors, title, publisher, description, pageCount, categories, thumbnail } = value.modalProduct;
                    
                    if (!addModalOpen) {
                        return null;
                    } else {
                        const newBook = {
                            author : authors[0],
                            title,
                            publisher,
                            description,
                            pages : pageCount,
                            genre : categories[0],
                            image_url : thumbnail,
                        };    
                        return (
                            <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div
                                            className="col-8 mx-auto col-md-6 col-lg-4 p-5 text-center text-capitalize"
                                            id="modal"
                                        >
                                            <h5>Add this item?</h5>
                                            <img src={thumbnail} className="img-fluid" alt="" />
                                            <h5>{title}</h5>
                                            <h5 className="text-muted">author : {authors}</h5>
                                            <h5 className="text-muted">publisher : {publisher}</h5>                                       
                                            <label>
                                                <input type="text" placeholder="Define a Price" value={this.state.value} onChange={this.handleChange} />
                                            </label>                                     
                                            <Link to="/booksAdministration">
                                                <ButtonContainer
                                                    onClick={() => {
                                                        newBook.price = Number(this.state.value);
                                                        addNewBook(newBook);
                                                        closeAddModal();
                                                    }}
                                                >
                                                    YES
                                                </ButtonContainer>
                                            </Link>
                                            <Link to="/booksAdministration">
                                                <ButtonContainer
                                                    onClick={() => {
                                                        closeAddModal();
                                                    }}
                                                >
                                                    NO
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
