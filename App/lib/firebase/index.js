import firebase from 'firebase';
import config from './config';
import * as auth from './auth';
import * as database from './database';

const init = () => firebase.initializeApp(config);

export { auth, database, init };
