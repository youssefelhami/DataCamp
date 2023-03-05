import {
  GET_CAMPGROUNDS,
  GET_CAMPGROUND,
  CAMPGROUND_ERROR,
  CLEAR_CAMPGROUND,
  UPDATE_LIKES,
  UPDATE_CAMPGROUND,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  campgrounds: {
    campgrounds: [],
    loading: true,
    error: {}
  },
  campground: {
    campground: null,
    loading: true,
    error: {}
  },
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CAMPGROUNDS:
      return {
        ...state,
        campgrounds: {
          ...state.campgrounds,
          campgrounds: payload,
          loading: false
        },
        error: {}
      };
    case GET_CAMPGROUND:
    case UPDATE_CAMPGROUND:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: payload,
          loading: false
        },
        error: {}
      };

    case CLEAR_CAMPGROUND:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: null,
          loading: true
        },
        error: {}
      };
    case UPDATE_LIKES:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: {
            ...state.campground.campground,
            likes: payload
          },
          loading: false
        },
        loading: false,
        error: {}
      };
    case ADD_COMMENT:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: {
            ...state.campground.campground,
            comments: payload
          },
          loading: false
        },
        error: {}
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        campground: {
          ...state.campground,
          campground: {
            ...state.campground.campground,
            comments: state.campground.campground.rating.filter(
              comment => comment.id !== payload
            )
          }
        },
        error: {}
      };
    case CAMPGROUND_ERROR:
      return {
        ...state,
        campground: {
          ...state.campground,
          loading: false,
        },
        campgrounds: {
          ...state.campgrounds,
          loading: false,
        },
        error: payload
        }
    default:
      return state;
  }
}
