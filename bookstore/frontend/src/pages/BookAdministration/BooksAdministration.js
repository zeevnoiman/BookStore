import React, { Component } from "react";
import Product from "../../components/Product";
import BookToAdministrate from "./BookToAdministrate";
import Title from "../../components/Title";
import styled from "styled-components";
import { ProductConsumer, getProducts } from "../../context";
import BookToAdd from "./BookToAdd";
import AddModal from "./AddModal"
import { ButtonContainer } from "../../components/Button";
import "./BooksAdministration.css"
export default class BooksAdministration extends Component {
    constructor(props) {
      super(props);
      this.state = {value: '',
                    googleBooks: []};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      console.log('A name was submitted: ' + this.state.value);
      event.preventDefault();
      this.googleBooksApi();
    }
          
    async googleBooksApi () {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.value}&intitle=${this.state.value}&key=AIzaSyD2QWE7fuDymvvLUCFwOfN7CHZ2w8sEmDI`, {
          method: 'GET',
      });           
      const books = await response.json();
      console.log(books);
      
      let preGoogleBooks = [];
      books.items.forEach(item => {
              const singleItem = { ...item };
              preGoogleBooks = [...preGoogleBooks, singleItem];
          });
      this.setState(() => {
          return { googleBooks : preGoogleBooks};
      });
    }

    render() {
        return (
  
            <React.Fragment>
              <div className="form-container">
                <div className="book-form">
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <input type="text" className="book-input" placeholder="Write a title of a book to look for..." value={this.state.value} onChange={this.handleChange} />
                  </label>
                  <button type="submit" class="btn btn-primary">Find to me!</button>
                </form>
                </div>
               </div>
                <ProductWrapper className="py-5">
                    <div className="container">
                        <Title name="Our" title="Books" />
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    const products = value.products;
                                    const productsFiltered = products.filter(product => product.title.includes(this.state.value));
                                    return productsFiltered.map(product => {
                                        return <BookToAdministrate key={product._id} product={product} />;
                                    });
                                }}
                            </ProductConsumer>
                        </div>   
                        <Title name="Google" title="Books" />          
                        <div className="row">         
                            {
                               this.state.googleBooks.length ? (
                               this.state.googleBooks.map(product => {
                                 return <BookToAdd key={product.id} product={product} />                  
                               })) : <h3>No books found yet... :( </h3>
                            }
                        </div>   
                    </div>
                    <AddModal/>
                </ProductWrapper>
            </React.Fragment>
        );
    }
}

const ProductWrapper = styled.section``;