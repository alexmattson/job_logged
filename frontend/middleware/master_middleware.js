import { applyMiddleware } from 'redux';

import SessionMiddleware from './session_middleware';

const masterMiddleware = applyMiddleware(
  SessionMiddleware
);

export default masterMiddleware;
