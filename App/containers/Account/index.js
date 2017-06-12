import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { RED, BLUE, BLACK } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  accountInfo: {
    padding: 8,
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 16,
    margin: 8,
  },
  username: {
    fontSize: 18,
    color: BLACK,
  },
  loginText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  loggingIn: {
    marginLeft: 8,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Account = ({ user, loggingIn, login, logout }) => {
  if (!user) {
    return (
      <View style={styles.container}>
        <Button title="Facebook 登入" backgroundColor="#3B5998" onPress={login} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.accountInfo}>
        <Image style={styles.avatar} source={{ uri: user.photoURL }} />
        <Text style={styles.username}>{user.displayName}</Text>
      </View>
      <Button title="登出" backgroundColor={RED} onPress={logout} />
    </View>
  );
};

export default Account;
