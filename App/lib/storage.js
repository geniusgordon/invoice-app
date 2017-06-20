import { AsyncStorage } from 'react-native';

export const getItem = key =>
  AsyncStorage.getItem(key).then(value => JSON.parse(value));

export const setItem = (key, value) =>
  AsyncStorage.setItem(key, JSON.stringify(value));
