import Rx from 'rxjs/Rx';
import firebase from 'firebase';
import pick from 'lodash/fp/pick';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export const stream = Rx.Observable
  .create(observer =>
    firebase.app().auth().onAuthStateChanged(user => observer.next(user)),
  )
  .mergeMap(async user => {
    if (!user) {
      return null;
    }
    const currentUser = pick(['uid', 'displayName', 'photoURL'], user);
    const database = firebase.app().database();
    const userRef = database.ref(`users/${currentUser.uid}`);
    await userRef.set(currentUser);
    return currentUser;
  })
  .share();

export const login = async () => {
  const result = await LoginManager.logInWithReadPermissions([
    'email',
    'public_profile',
  ]);
  if (!result.isCancelled) {
    const data = await AccessToken.getCurrentAccessToken();
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    await firebase.auth().signInWithCredential(credential);
  }
};

export const logout = () => firebase.app().auth().signOut();
