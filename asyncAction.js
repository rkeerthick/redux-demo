const redux = require("redux");
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");
const logger = require("redux-logger");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// state
const initialState = {
  loading: false,
  user: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

// action creator
const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUserError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

// reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        dispatch(fetchUserSuccess(response.data.map(user => user.id)));
      })
      .catch((error) => dispatch(fetchUserError(error.message)));
  };
};

const store = createStore(reducer, applyMiddleware(reduxThunk));
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
// unsubscribe();