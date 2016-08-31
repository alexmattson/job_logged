import { applyMiddleware } from 'redux';

import ApplicationMiddleware from './application_middleware';
import SessionMiddleware from './session_middleware';

const masterMiddleware = applyMiddleware(
  ApplicationMiddleware,
  SessionMiddleware
);

export default masterMiddleware;
