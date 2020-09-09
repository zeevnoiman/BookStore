import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { storeProducts } from "../data";
import styled from "styled-components";
import { ProductConsumer, getProducts } from "../context";

export default class ProductList extends Component {

    state = {
        products: getProducts()
    };

    render() {
        return (
            <React.Fragment>
                <ProductWrapper className="py-5">
                    <div className="container">
                        <Title name="Our" title="Books" />
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    const products = value.products;

                                    return products.map(product => {
                                        return <Product key={product._id} product={product} />;
                                    });
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </ProductWrapper>
            </React.Fragment>
        );
    }
}

const ProductWrapper = styled.section``;
