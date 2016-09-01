import { applyMiddleware } from 'redux';

import ApplicationMiddleware from './application_middleware';
import SessionMiddleware from './session_middleware';
import EventMiddleware from './event_middleware';

const masterMiddleware = applyMiddleware(
  ApplicationMiddleware,
  SessionMiddleware,
  EventMiddleware
);

export default masterMiddleware;
