import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../../context";
import { ButtonContainer } from "../../components/Button";
import { Link } from "react-router-dom";

export default class DeleteModal extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { deleteModalOpen, closeDeleteModal, deleteFromStore } = value;
                    const { _id, image_url, title, price } = value.modalProduct;
                    console.log(`from delete modal ${deleteModalOpen}`);
                    
                    if (!deleteModalOpen) {
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
                                            <h5>Delete this item?</h5>
                                            <img src={image_url} className="img-fluid" alt="" />
                                            <h5>{title}</h5>
                                            <h5 className="text-muted">price : ${price}</h5>
                                            <Link to="/booksAdministration">
                                                <ButtonContainer
                                                    onClick={() => {
                                                        deleteFromStore(_id);
                                                        closeDeleteModal();
                                                    }}
                                                >
                                                    YES
                                                </ButtonContainer>
                                            </Link>
                                            <Link to="/booksAdministration">
                                                <ButtonContainer
                                                    onClick={() => {
                                                        closeDeleteModal();
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
