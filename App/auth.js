import firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

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
