import React from 'react';
import { Link } from 'react-router-dom';

const CampgroundBadge = ({ campground }) => {
  return (
    <div className="campground-badge">
      <Link to="/">
        <img
          className="badge-img"
          src={campground.image}
          alt={campground.name}
        />
      </Link>
      <div className="badge-info">
        <h3 className="badge-title">{campground.name}</h3>
        <Link to={`/campground/${campground.id}`} className="btn btn-primary">
          More info
        </Link>
      </div>
    </div>
  );
};

export default CampgroundBadge;
