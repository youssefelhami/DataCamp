import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearCampground,
  deleteCampground
} from '../../actions/campground';
import Modal from '../layout/Modal';

const CampgroundDetail = ({
  clearCampground,
  campground,
  auth,
  deleteCampground
}) => {

  const [showModal, setShowModal] = useState(false);

  const deleteActions = (
    <Fragment>
      <button onClick={() => setShowModal(false)} className="btn btn-primary">
        Cancel
      </button>
      <button
        onClick={() => deleteCampground(campground.id)}
        className="btn btn-danger">
        Delete
      </button>
    </Fragment>
  );

  return (
    <Fragment>
      <img
        className="campground-detail-image wow slideInLeft"
        src={campground.image}
        alt={campground.name}
      />
      <div className="campground-detail-content">
        <h2>About</h2>
        <h1 className="campground-detail-title  text-primary">
          {campground.name}
        </h1>
        <p className="lead">{campground.description}</p>
        <p className="sub-text">
          Submited by {campground.author ? campground.author : 'Unknown'}, on{' '}
          <Moment format="DD/MM/YYYY">{campground.timestamp}</Moment>
        </p>

        {auth.isAuthenticated ? (
          <Fragment>
            {auth.user.user.username === campground.author ? (
              <div className="campground-action ">
                <Link
                  onClick={() => clearCampground()}
                  to={`/campground/edit/${campground.id}`}
                  className="btn btn-primary">
                  Edit
                </Link>
                <a
                  href="#!"
                  onClick={e => setShowModal(true)}
                  className="btn btn-danger">
                  Delete
                </a>
              </div>
            ) : null}
          </Fragment>
        ) : null}
      </div>
      <Modal
        className={`modal ${showModal ? 'show' : ''}`}
        title="Delete campground"
        content="Are you sure you want to delete this campground?"
        actions={deleteActions}
        onDismiss={() => {
          setShowModal(false);
        }}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { clearCampground, deleteCampground }
)(CampgroundDetail);
