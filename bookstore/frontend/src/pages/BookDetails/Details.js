import React from "react";
import { ProductConsumer } from "../../context";
import { ButtonContainer } from "../../components/Button";
import { Link } from "react-router-dom";
import Posts from './Posts/Posts';
// import './Details.css';

export default function Details() {

    return (
        <ProductConsumer>
            {value => {

                const {
                    _id,
                    author,
                    image_url,
                    description,
                    price,
                    title,
                    inCart
                } = value.detailProduct;

                const { detailComments, loadingComments, isAuthenticated, addComment, likePost, dislikePost } = value;

                console.log(`Product ID : ${_id}`);

                let newDescription = "";
                if(description){
                    const lcdescription = description.toLowerCase();
                    newDescription = upperCasefirst(lcdescription);
                    console.log(newDescription);
                    
                }
                function upperCasefirst(string) 
                {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
                return (

                    <div className="container py-5" id="topDiv">
                        {/* title */}
                        <div className="row">
                            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                <h1>{title}</h1>
                            </div>
                        </div>
                        {/* end of title */}
                        <div className="row">
                            <div className="col-10 mx-auto col-md-2 my-3">
                                <img src={image_url} className="img-fluid myimg" alt="" />
                            </div>
                            {/* product info */}
                            <div className="col-10 mx-auto col-md-10 my-3">
                                <h1>title : {title}</h1>
                                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                    Author : <span className="text-uppercase">{author}</span>
                                </h4>
                                <h4 className="text-blue">
                                    <strong>
                                        price : <span>$</span>
                                        {price}
                                    </strong>
                                </h4>
                                <p className="font-weight-bold mt-3 mb-0">
                                    Some info about product :
                                </p>
                                <p className="text-muted lead">{newDescription}</p>
                                {/* buttons */}
                                <div>
                                    <Link to="/">
                                        <ButtonContainer>back to products</ButtonContainer>
                                    </Link>
                                    <ButtonContainer
                                        cart
                                        disabled={inCart ? true : false}
                                        onClick={() => {
                                            value.addToCart(_id);
                                            value.openModal(_id);
                                        }}
                                    >
                                        {inCart ? "in cart" : "add to cart"}
                                    </ButtonContainer>
                                </div>
                            </div>
                        </div>
                        <div id="lastBottomDiv">
                            <Posts comments={detailComments} 
                                   loading={loadingComments} 
                                   isAuthenticated={isAuthenticated}
                                   title={title}
                                   addComment={addComment}
                                   likePost={likePost}
                                   dislikePost={dislikePost} />
                        </div>

                    </div>

                );
            }}
        </ProductConsumer>
    );
}

