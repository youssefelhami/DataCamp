import React, { useEffect, Fragment } from 'react';
import { getCampground } from '../../actions/campground';

import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import CampgroundHeader from './CampgroundHeader';
import CampgroundDetail from './CampgroundDetail';
import CommentList from './comment/CommentList';
import Alert from '../layout/Alert';
import {useHistory} from 'react-router-dom';

const Campground = ({ match, getCampground, campground, error }) => {
  const navigate = useHistory();

  useEffect(() => {
    getCampground(match.params.id);
  }, [getCampground, match.params.id]);

  return campground.loading ? (
    <Spinner />
  ) : (
        error.status == undefined ? <Fragment> <header>
        <Navbar className="menu " />
        <CampgroundHeader campground={campground.campground} />
      </header>

      <div className="campground-detail-section">
        <CampgroundDetail campground={campground.campground} />
      </div>

      <div className="section-campgrounds dark-bg p-3">
        <CommentList
          campgroundId={campground.campground.id}
          comments={campground.campground.rating}
        />
      </div> 
    </Fragment>: <>
      {
        navigate.push('/')
      }
    </>
  );
};

const mapStateToProps = state => ({
  campground: state.campground.campground,
  error: state.campground.error
});

export default connect(
  mapStateToProps,
  { getCampground }
)(Campground);
