import { applyMiddleware } from 'redux';

import ApplicationMiddleware from './application_middleware';
import SessionMiddleware from './session_middleware';
import EventMiddleware from './event_middleware';
import ContactMiddleware from './contact_middleware';
import coverLetterMiddleware from './cover_letter_middleware';

const masterMiddleware = applyMiddleware(
  ApplicationMiddleware,
  SessionMiddleware,
  EventMiddleware,
  ContactMiddleware,
  coverLetterMiddleware
);

export default masterMiddleware;
