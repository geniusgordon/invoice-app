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
  loginBtn: {
    borderRadius: 32,
  },
});

const Account = ({ user, loggingIn, login, logout }) => {
  if (!user) {
    return (
      <View style={styles.container}>
        <Button
          large
          disabled={loggingIn}
          title="Facebook 登入"
          backgroundColor="#3B5998"
          borderRadius={32}
          containerViewStyle={styles.loginBtn}
          onPress={login}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.accountInfo}>
        <Image style={styles.avatar} source={{ uri: user.photoURL }} />
        <Text style={styles.username}>{user.displayName}</Text>
      </View>
      <Button
        large
        title="登出"
        backgroundColor={RED}
        borderRadius={32}
        containerViewStyle={styles.loginBtn}
        onPress={logout}
      />
    </View>
  );
};

export default Account;
