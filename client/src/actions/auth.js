import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { useHistory } from 'react-router-dom';

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/users/login/', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    })

    // dispatch(loadUser());
  } catch (error) {
    if (error.response.data["non_field_errors"]) {
      return dispatch(setAlert(error.response.data["non_field_errors"].join('\n'), 'danger'));
    }

    if(error.response.data['password1']) {
      return dispatch(setAlert(error.response.data["password1"].join('\n')));
    }

    if(error.response.data['username']) {
      return dispatch(setAlert(error.response.data["username"].join('\n')));
    }
    
    if(error.response.data['email']) {
      return dispatch(setAlert(error.response.data["email"].join('\n')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/users/profile/');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  const timeout = (ms) => new Promise(res => setTimeout(res, ms));

  await axios.post(process.env.REACT_APP_BACKEND_URL + '/users/register/', {
    username: name,
    email: email,
    password1: password,
    password2: password
  }, config).then((res) => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('You have registered successfully please log in!', 'success'))
  }).catch((error) => {
    if (error.response.data["non_field_errors"]) {
      return dispatch(setAlert(error.response.data["non_field_errors"].join('\n'), 'danger'));
    }

    if(error.response.data['password1']) {
      return dispatch(setAlert(error.response.data["password1"].join('\n')));
    }

    if(error.response.data['username']) {
      return dispatch(setAlert(error.response.data["username"].join('\n')));
    }
    
    if(error.response.data['email']) {
      return dispatch(setAlert(error.response.data["email"].join('\n')));
    }

    dispatch({
      type: REGISTER_FAIL
    });

  })

  // try {
  //   const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/users/register/', {
  //     username: name,
  //     email: email,
  //     password1: password,
  //     password2: password
  //   }, config);

  //   console.log("res: ", res)

  //   dispatch({
  //     type: REGISTER_SUCCESS,
  //     payload: res.data
  //   });

  //   dispatch(setAlert('You have registered successfully please log in!', 'success'))

  //   useHistory.push('/login')
  //   // dispatch({ 
  //   //   type: USER_LOADED,
  //   //   payload: res.data.user
  //   // })

  //   // dispatch(loadUser());
  // } catch (error) {

  //   if (error.response.data["non_field_errors"]) {
  //     return dispatch(setAlert(error.response.data["non_field_errors"].join('\n'), 'danger'));
  //   }

  //   if(error.response.data['password1']) {
  //     return dispatch(setAlert(error.response.data["password1"].join('\n')));
  //   }

  //   if(error.response.data['username']) {
  //     return dispatch(setAlert(error.response.data["username"].join('\n')));
  //   }
    
  //   if(error.response.data['email']) {
  //     return dispatch(setAlert(error.response.data["email"].join('\n')));
  //   }
  //   dispatch({
  //     type: REGISTER_FAIL
  //   });
  // }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
