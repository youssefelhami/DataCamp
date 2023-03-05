import React, { useState, Fragment } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/campground';
import Alert from '../../layout/Alert';

const CommentList = ({
  comments,
  campgroundId,
  addComment,
  isAuthenticated,
  auth
}) => {
  const [text, setText] = useState('');
  return (
    <div className="container">
      <h1 className="section-header text-white">Comments</h1>
      {isAuthenticated && auth ? (
        <Fragment>
          <Alert />
          <form
            onSubmit={e => {
              e.preventDefault();
              addComment(campgroundId, { text });
              setText('');
            }}
            className="form my-2">
            <div className="form-group">
              <textarea
                value={text}
                name="comment"
                onChange={e => setText(e.target.value)}
                placeholder="Create a comment"
                required
              />
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </Fragment>
      ) : null}

      {auth ? ( 
      <div className="comment-group">
        {comments.map(comment => (
          <Comment
            campgroundId={campgroundId}
            comment={comment}
            key={comment.id}
            auth={auth.user}
          />
        ))}
      </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentList);
