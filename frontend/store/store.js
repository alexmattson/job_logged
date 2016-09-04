import { createStore } from 'redux';
import RootReducer from '../reducers/root_reducer';
import masterMiddleware from '../middleware/master_middleware';
import merge from 'lodash/merge';

const nullState = {
  session: {},
  errors: [], 
  applications: {
    all: {},
    current: {
      contact: {}
    }
  },
  events: {}
};

const configureStore = (inputs) => {
  let preloadedState = merge({}, nullState, inputs);
  return (
    createStore(
      RootReducer,
      preloadedState,
      masterMiddleware
    )
  );
};

export default configureStore;
