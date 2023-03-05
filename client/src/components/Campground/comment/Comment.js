import React from 'react';
import Moment from 'react-moment';
import { deleteComment } from '../../../actions/campground';
import { connect } from 'react-redux';

const Comment = ({ comment, campgroundId, deleteComment, auth }) => {

  return (
    <div className="comment my-2">
      <img src={comment.avatar} />
      <div className="comment-detail">
        <h4 className="comment-author">{comment.user}</h4>
        <p className="sub-text text-white">{comment.comment}</p>
        {
          auth && comment.user === auth.user.username ? (
            <button
              onClick={e => {
                deleteComment(campgroundId, comment.id);
              }}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          ): null
        }
      </div>
      <p className="sub-text text-white time-ago">
        <Moment fromNow>{comment.timestamp}</Moment>
      </p>
    </div>
  );
};

export default connect(
  null,
  { deleteComment }
)(Comment);
