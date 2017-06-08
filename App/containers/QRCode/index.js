import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  camera: {
    height: 200,
  },
  qrcode: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'green',
  },
});

class QRCodeScanner extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="camera" size={40} color={tintColor} />
    ),
  };
  state = {
    qrcodes: {},
  };
  handleBarCodeRead = e => {
    if (this.state.qrcodes[e.data]) {
      return;
    }
    this.setState({
      qrcodes: {
        ...this.state.qrcodes,
        [e.data]: e,
      },
    });
  };
  renderQRCodeBounds = () => {
    const { height, width } = Dimensions.get('window');
    const qrcodes = Object.values(this.state.qrcodes);
    return qrcodes.map(qrcode => {
      const bounds = JSON.parse(qrcode.bounds);
      const qrcodePositionStyle = {
        top: height * bounds[1][1],
        left: width * bounds[0][0],
        height: height * (bounds[0][1] - bounds[1][1]),
        width: width * (bounds[2][0] - bounds[0][0]),
      };
      return (
        <View key={qrcode.data} style={[styles.qrcode, qrcodePositionStyle]} />
      );
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Camera
          barCodeTypes={['qr']}
          onBarCodeRead={this.handleBarCodeRead}
          style={styles.camera}
        />
        {this.renderQRCodeBounds()}
      </View>
    );
  }
}

export default QRCodeScanner;
