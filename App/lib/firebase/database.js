import Rx from 'rxjs/Rx';
import firebase from 'firebase';
import set from 'lodash/fp/set';

export const defaultType = 'once';
export const defaultEvent = 'value';

const queryTypes = [
  'orderByChild',
  'orderByKey',
  'orderByPriority',
  'orderByValue',
  'startAt',
  'endAt',
  'equalTo',
  'isEqual',
  'limitToFirst',
  'limitToLast',
];

export const createObservable = ({
  type = defaultType,
  event = defaultEvent,
  path,
  query = {},
}) => {
  const database = firebase.app().database();
  return Rx.Observable.create(observer => {
    let request = database.ref(path);
    queryTypes.forEach(key => {
      if (query[key]) {
        switch (key) {
          case 'orderByValue':
          case 'orderByPriority':
          case 'orderByKey':
            request = request[key]();
            break;
          default:
            request = request[key](query[key]);
        }
      }
    });
    request[type](event, snapshot => {
      const data = snapshot.val();
      observer.next(data);
    });
    return () => database.ref(path).off(event);
  });
};

export const update = (path, value) => {
  const database = firebase.app().database();
  return database.ref(path).update(value);
};
