import React from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
// import { ProductConsumer } from '../../context';

// const endpoint = 'http://localhost:8080/';
// const POSTS_URL = endpoint + 'posts/';

// const socket = io(endpoint);

// export default class Posts extends Component {
    export default function Posts(props) {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         comments: [],
    //         loading: false
    //     };

    //     this.addComment = this.addComment.bind(this);
    // }

    // componentDidMount() {
    //     // loading
    //     this.setState({ loading: true });

    //     // get all the comments
    //     axios.get(POSTS_URL + this.props.bookId)
    //         .then(res => {
    //             const posts = res.data;
    //             // console.log(posts);

    //             this.setState({
    //                 comments: posts,
    //                 loading: false
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             this.setState({ loading: false });
    //         });

    //     socket.on('postReceived', post => {
    //         console.log("postReceived");
    //         // console.log(post);
    //         this.setState({ comments: [post, ...this.state.comments] });
    //     });

    // }

    // /**
    //  * Add new comment & emit event
    //  * @param {Object} comment
    //  */
    // addComment(comment) {
    //     this.setState({
    //         loading: false,
    //         comments: [comment, ...this.state.comments]
    //     });

    //     socket.emit("newPost", comment);
    // }

    // render() {
        const { comments, loading, isAuthenticated, title, addComment, likePost, dislikePost } = props;

        return (
                <div className="App container bg-light shadow">
                    <div className="row">
                        {isAuthenticated &&
                            <div className="col-4  pt-3 border-right">
                                <h6>Say something about { title }</h6>
                                <CommentForm addComment={ addComment } />
                            </div>
                        }

                        <div className={isAuthenticated? "col-8 pt-3 bg-white" : "col-12 pt-3 bg-white"}>
                            <CommentList
                                loading={loading}
                                comments={comments}
                                likePost={likePost}
                                dislikePost={dislikePost}
                            />
                        </div>
                    </div>
                </div>
            );
    // }
}