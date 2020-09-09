import React, { Component } from "react";
// import axios from "axios";
// import styled from 'styled-components';
import { Rating } from '@material-ui/lab';

// import { ProductConsumer } from '../../context';
// import './CommentForm.css';

// import { Rating } from 'react-rating';

// var Rating = require('react-rating');

// const endpoint = 'http://localhost:8080/';
// const POSTS_URL = endpoint + 'posts/';

export default class CommentForm extends Component {
    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            error: "",
            message:'',
            rating:0,
        };

        // bind context to methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Handle form input field changes & update the state
     */
    handleFieldChange = event => {
        const { value } = event.target;
        // console.log(name);
        // console.log(value);

        this.setState({
            ...this.state,
            message: value
        });
    };

    loadStats = () => {
        // loading status and clear error
        this.setState({ error: "", loading: true });
    };

    clearMessageBox = () => {
         // clear the message box
         this.setState({
            loading: false,
            comment: '',
            rating:0
        });
    };

    /**
     * Form submit handler
     */
    // onSubmit(e) {
    //     // prevent default form submission
    //     e.preventDefault();

    //     if (!this.isFormValid()) {
    //         this.setState({ error: "All fields are required." });
    //         return;
    //     }

    //     // loading status and clear error
    //     this.setState({ error: "", loading: true });

    //     // persist the comments on server
    //     let { comment } = this.state;
    //     console.log(comment);


    //     axios.post(POSTS_URL, comment)
    //         .then(post => {
    //             // console.log(post.data);
    //             this.props.addComment(post.data);

    //             // clear the message box
    //             this.setState({
    //                 loading: false,
    //                 comment: { ...comment, message: "" }
    //             });
    //         })
    //         .catch(err => {
    //             this.setState({
    //                 error: "Something went wrong while submitting form.",
    //                 loading: false
    //             });
    //         });
    // }

    // /**
    //  * Simple validation
    //  */
    // isFormValid() {
    //     return this.state.comment.name !== "" && this.state.comment.message !== "";
    // }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }

    render() {
        const { addComment } = this.props;
        
        return (
            <React.Fragment>
                <form method="post" onSubmit={e => { 
                    e.preventDefault();
                    // console.log(e.target.message);
                    // const { value } = e.target.message;
                    // console.log(value);
                    
                    // const message = value;
                    const message = this.state.message;
                    const rating = this.state.rating;
                    
                    this.loadStats();

                    const response = addComment({ message, rating });

                    if(response.success){
                        this.clearMessageBox();
                    }
                    else{
                        this.setState({
                            error: response.error,
                            loading: false
                        });
                    }
                    }}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">Your Rate:</div>
                            <div className="col-6"><Rating
                              name="simple-controlled"
                              value={this.state.rating}
                              onChange={(event, newValue) => {
                                console.log(newValue);
                                this.setState({rating:newValue});
                              }}
                            /></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <textarea
                            onChange={this.handleFieldChange}
                            value={this.state.message}
                            className="form-control"
                            placeholder="Your Comment"
                            name="message"
                            rows="5"
                        />
                    </div>

                    {this.renderError()}

                    <div className="form-group">
                        <button disabled={this.state.loading} className="btn btn-primary">
                            Comment &#10148;
            </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}