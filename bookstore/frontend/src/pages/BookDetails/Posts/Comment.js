import React from "react";
import moment from 'moment';
// moment is a library for parsing, validating, manipulating, and formatting dates

import { Rating } from '@material-ui/lab';
import { ProductConsumer } from '../../context';

export default function Comment(props) {

    // const { name, message, createdAt } = props.comment;
    const { _id, name, message, createdAt, rating, likes, dislikes } = props.comment;
    const { likePost, dislikePost } = props;

    return (
        <div className="media mb-3">
{/* <img
    className="mr-3 bg-light rounded"
    width="48"
    height="48"
    src={imgUrl}
    alt={name}
/> */}

<div className="media-body p-2 shadow-sm rounded bg-light border">
    <small className="float-right text-muted">{moment(createdAt).fromNow()}</small>
    <small className="float-right text-muted">{rating}</small>
    <h6 className="mt-0 mb-1 text-muted"><strong>{name}</strong></h6>
    <Rating value={rating} readOnly />
    {message}
    <a href="#" onClick={e =>{e.preventDefault(); dislikePost(_id); }}><small className="float-right text-muted"><i className="far fa-thumbs-down">
    <span className="badge badge-primary">{dislikes}</span>
    </i></small></a>
    <small className="float-right text-muted">&nbsp;&nbsp;&nbsp;</small>
    <a href="#" onClick={e =>{e.preventDefault(); likePost(_id); }}><small className="float-right text-muted"><i className="far fa-thumbs-up">
    <span className="badge badge-primary">{likes}</span>
    </i></small></a>
</div>
</div>
    );
}